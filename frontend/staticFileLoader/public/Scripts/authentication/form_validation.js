document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form_login");
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  const smallUser = document.getElementById("err_user_log");
  const smallPass = document.getElementById("err_pass_log");
  const loginButton = document.getElementById("login_button");
  let small;

  username.addEventListener("click", function (ev) {
    ev.preventDefault();
    form.addEventListener("click", userHandler);
  });

  password.addEventListener("click", function (ev) {
    ev.preventDefault();
    form.addEventListener("click", passwordHandler);
  });

  document.querySelector(".close").addEventListener("click", function () {
    form.removeEventListener("click", userHandler);
    form.removeEventListener("click", passwordHandler);
  });

  window.addEventListener("click", function (e) {
    var modal = document.querySelector(".bg_model");

    if (e.target === modal) {
      form.removeEventListener("click", userHandler);
      form.removeEventListener("click", passwordHandler);
    }
  });

  loginButton.addEventListener("click", function (ev) {
    ev.preventDefault();
    const okUsername = verifUsernameLogin(username.value);
    const okPassword = verifPasswordLogin(password.value);
    if(okUsername && okPassword){
      let xhttp = new XMLHttpRequest();
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          const response = JSON.parse(this.responseText);
          if (this.status === 400) {
            document.getElementById(
                "login_response"
            ).innerText = response.content.message;
          } else {
            if (this.status === 200) {
              let response = this.responseText;
              response = JSON.parse(response);
              localStorage.setItem("auth-token", response.content.userObj.token);
              let locationReq = window.location.href;
              location.href = locationReq.substring(0, locationReq.length - 1);
            }
          }
        }
      };
      xhttp.open("post", "http://localhost:5003/users/login", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      const values = {
        username: username.value,
        password: password.value,
      };
      xhttp.send(JSON.stringify(values));
    }
  });

  function userHandler(e) {
    e.preventDefault();
    const usernameValue = username.value.trim();
    if (e.target !== username) {
      verifUsernameLogin(usernameValue);
    }
  }

  function verifUsernameLogin(usernameValue) {
    if (usernameValue === "") {
      setFormErrorFor(username, "Username cannot be blank!");
      return false;
    } else {
      if (usernameValue.length < 6) {
        setFormErrorFor(username, "Username must have at least 6 characters!");
        return false;
      } else {
        if(isInvalid(usernameValue)){
          setFormErrorFor(username, "Username must contain only letters, digits or symbols like '.', '-' or '_'!");
          return false;
        }else{
          setFormSuccessFor(username);
          return true;
        }
      }
    }
  }

  function passwordHandler(e) {
    e.preventDefault();
    const passwordValue = password.value.trim();
    if (e.target !== password) {
      verifPasswordLogin(passwordValue);
    }
  }

  function verifPasswordLogin(passwordValue) {
    if (passwordValue === "") {
      setFormErrorFor(password, "Password cannot be blank!");
      return false;
    } else {
      if (passwordValue.length < 6) {
        setFormErrorFor(password, "Password must have at least 6 characters!");
        return false;
      } else {
        if(isInvalid(passwordValue)){
          setFormErrorFor(password, "Password must contain only letters, digits or symbols like '.', '-' or '_'!");
          return false;
        }else{
          setFormSuccessFor(password);
          return true;
        }
      }
    }
  }

  function setFormErrorFor(input, message) {
    if (input === username) small = smallUser.querySelector("small");
    else small = smallPass.querySelector("small");
    small.innerText = message;

    input.className = "error";
  }

  function setFormSuccessFor(input) {
    if (input === username) {
      small = smallUser.querySelector("small");
      small.innerText = "";
    } else {
      small = smallPass.querySelector("small");
      small.innerText = "";
    }

    input.className = "success";
  }

  function isInvalid(input){
    return /[!$%^@&*()+|~=`{}\[\]:";'<>?,\\/]/.test(input);
  }
});
