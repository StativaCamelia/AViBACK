document.addEventListener("DOMContentLoaded", function () {
  const formSignup = document.getElementById("form_signup");
  const email = document.getElementById("email");
  const usernameSignup = document.getElementById("username_signup");
  const passwordSignup = document.getElementById("password_signup");
  const smallUserSignup = document.getElementById("err_user_signup");
  const smallPassSignup = document.getElementById("err_pass_signup");
  const smallEmailSignup = document.getElementById("err_email_signup");
  const registerButton = document.getElementById("register_button");
  let smallSignup;

  email.addEventListener("click", function (ev) {
    ev.preventDefault();
    formSignup.addEventListener("click", emailSignHandler);
  });

  usernameSignup.addEventListener("click", function (ev) {
    ev.preventDefault();
    formSignup.addEventListener("click", userSignHandler);
  });

  passwordSignup.addEventListener("click", function (ev) {
    ev.preventDefault();
    formSignup.addEventListener("click", passwordSignHandler);
  });

  document.querySelector(".close_sign").addEventListener("click", function () {
    formSignup.removeEventListener("click", emailSignHandler);
    formSignup.removeEventListener("click", userSignHandler);
    formSignup.removeEventListener("click", passwordSignHandler);
  });

  window.addEventListener("click", function (e) {
    var modal = document.querySelector(".bg_model");

    if (e.target === modal) {
      formSignup.removeEventListener("click", emailSignHandler);
      formSignup.removeEventListener("click", userSignHandler);
      formSignup.removeEventListener("click", passwordSignHandler);
    }
  });

  registerButton.addEventListener("click", function (ev) {
    ev.preventDefault();
    const okEmail = verifEmail(email.value);
    const okUsername = verifUsername(usernameSignup.value);
    const okPassword = verifPassword(passwordSignup.value);

    if(okEmail && okUsername && okPassword){
      let xhttp = new XMLHttpRequest();
      xhttp.open("post", "http://localhost:5003/users/register", true);
      xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      const values = {
        email: email.value,
        username: usernameSignup.value,
        password: passwordSignup.value,
      };
      xhttp.send(JSON.stringify(values));
      xhttp.onreadystatechange = function () {
        if (this.readyState === 4) {
          const response = JSON.parse(this.responseText);
          if (this.status === 201 || this.status === 400) {
            document.getElementById("register_response").innerText =
                response.content.message;
          } else {
            console.log(response.content.message);
          }
        }
      };
    }
  });

  function emailSignHandler(e) {
    e.preventDefault();
    const emailValue = email.value.trim();
    if (e.target !== email) {
      verifEmail(emailValue);
    }
  }

  function verifEmail(emailValue) {
    if (emailValue === "") {
      setErrorFor(email, "Email cannot be blank!");
      return false;
    } else {
      if (!isEmail(emailValue)) {
        setErrorFor(email, "This is not an email address!");
        return false;
      } else {
        setSuccessFor(email);
        return true;
      }
    }
  }

  function userSignHandler(e) {
    e.preventDefault();
    const usernameValue = usernameSignup.value.trim();
    if (e.target !== usernameSignup) {
      verifUsername(usernameValue);
    }
  }

  function verifUsername(usernameValue) {
    if (usernameValue === "") {
      setErrorFor(usernameSignup, "Username cannot be blank!");
      return false;
    } else {
      if (usernameValue.length <= 5) {
        setErrorFor(
          usernameSignup,
          "Username must have at least 6 characters!"
        );
        return false;
      } else {
        if(isInvalidInput(usernameValue)){
          setErrorFor(
              usernameSignup,
              "Username must contain only letters, digits or symbols like '.', '-' or '_'!"
          );
          return false;
        }else{
          setSuccessFor(usernameSignup);
          return true;
        }
      }
    }
  }

  function passwordSignHandler(e) {
    e.preventDefault();
    const passwordValue = passwordSignup.value.trim();
    if (e.target !== passwordSignup) {
      verifPassword(passwordValue);
    }
  }

  function verifPassword(passwordValue) {
    if (passwordValue === "") {
      setErrorFor(passwordSignup, "Password cannot be blank!");
      return false;
    } else {
      if (passwordValue.length < 6) {
        setErrorFor(
          passwordSignup,
          "Password must have at least 6 characters!"
        );
        return false;
      } else {
        if(isInvalidInput(passwordValue)){
          setErrorFor(
              passwordSignup,
              "Password must contain only letters, digits or symbols like '.', '-' or '_'!"
        );
          return false;
        }else{
          setSuccessFor(passwordSignup);
          return true;
        }
      }
    }
  }

  function setErrorFor(input, message) {
    if (input === usernameSignup)
      smallSignup = smallUserSignup.querySelector("small");
    else {
      if (input === email)
        smallSignup = smallEmailSignup.querySelector("small");
      else smallSignup = smallPassSignup.querySelector("small");
    }

    smallSignup.innerText = message;

    input.className = "error";
  }

  function setSuccessFor(input) {
    if (input === usernameSignup) {
      smallSignup = smallUserSignup.querySelector("small");
      smallSignup.innerText = "";
    } else {
      if (input === passwordSignup) {
        smallSignup = smallPassSignup.querySelector("small");
        smallSignup.innerText = "";
      } else {
        smallSignup = smallEmailSignup.querySelector("small");
        smallSignup.innerText = "";
      }
    }

    input.className = "success";
  }

  function isInvalidInput(input){
    return /[!$%^@&*()+|~=`{}\[\]:";'<>?,\\/]/.test(input);
  }

  function isEmail(email) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  }
});
