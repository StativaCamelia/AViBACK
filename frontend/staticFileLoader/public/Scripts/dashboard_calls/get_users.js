document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:5003/users";
  const authToken = localStorage.getItem("auth-token");
  function send_request_create(emailValue, usernameValue, passwordValue) {
    let xhttp = new XMLHttpRequest();
    xhttp.open("post", url, true);
    xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    const values = {
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
    };
    xhttp.send(JSON.stringify(values));
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          createUserMessage.innerText = "USER CREATED!";
        } else {
          console.log(response.content);
          createUserMessage.innerText = "USER NOT CREATED!";
        }
      }
    };
  }

  function send_request_get_by_id(userId) {
    let xhttp = new XMLHttpRequest();
    const urlWithId = url + "?userId=" + userId;
    xhttp.open("get", urlWithId, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          createGetUserResult(response.content);
        } else {
          console.log(response.content);
        }
      }
    };
  }

  function send_request_get_all() {
    let xhttp = new XMLHttpRequest();
    xhttp.open("get", url, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          createGetUsersResult(response.content);
        } else {
          console.log(response.content);
        }
      }
    };
  }

  const createUser = document.getElementById("create_user");
  const childCreateUser = createUser.childNodes;
  const readUser = document.getElementById("read_user");
  const childReadUser = readUser.childNodes;
  const readUsers = document.getElementById("read_users");
  const childReadUsers = readUsers.childNodes;
  const updateUser = document.getElementById("update_user");
  const deleteUser = document.getElementById("delete_user");
  const deleteAllUsers = document.getElementById("delete_all_users");

  function resetCreateForm() {
    createUserMessage.innerText = "";
    userFormCreate.style.display = "none";
    childCreateUser[0].id = "";
    resetCreateUserFields();
  }

  function resetCreateUserFields() {
    createUserEmail.value = "";
    createUserUsername.value = "";
    createUserPassword.value = "";
  }

  function resetGetUserForm() {
    deleteElementNodes(getUserResult);
    userFormGetUser.style.display = "none";
    childReadUser[0].id = "";
    getUserId.value = "";
  }

  function resetGetAllUsers() {
    deleteElementNodes(getAllUsers);
    getAllUsers.style.display = "none";
    childReadUsers[0].id = "";
  }

  //CREATE USER
  const userFormCreate = document.getElementById("user_form_create");
  const createUserMessage = document.getElementById("create_user_message");
  const createUserEmail = document.getElementById("create_user_email");
  const createUserUsername = document.getElementById("create_user_username");
  const createUserPassword = document.getElementById("create_user_password");
  const submitCreateUser = document.getElementById("submit_create_user");

  createUser.addEventListener("click", () => {
    resetGetUserForm();
    resetGetAllUsers();
    childCreateUser[0].id = "active_user";
    userFormCreate.style.display = "flex";
    submitCreateUser.addEventListener("click", (e) => {
      e.preventDefault();
      const emailValue = createUserEmail.value;
      const usernameValue = createUserUsername.value;
      const passwordValue = createUserPassword.value;
      send_request_create(emailValue, usernameValue, passwordValue);
    });
  });

  //GET USER BY ID
  const userFormGetUser = document.getElementById("user_form_get_user");
  const getUserId = document.getElementById("get_user_id");
  const submitGetUser = document.getElementById("submit_get_user");
  const getUserResult = document.getElementById("get_user_result");
  readUser.addEventListener("click", () => {
    resetCreateForm();
    resetGetAllUsers();
    childReadUser[0].id = "active_user";
    userFormGetUser.style.display = "flex";
    submitGetUser.addEventListener("click", (e) => {
      e.preventDefault();
      const userId = getUserId.value;
      send_request_get_by_id(userId);
    });
  });
  function createGetUserResult(user) {
    deleteElementNodes(getUserResult);
    const ul = document.createElement("ul");
    let userDetails = [];
    userDetails.push("Id: " + user._id);
    userDetails.push("Type " + user.type);
    userDetails.push("Email: " + user.email);
    userDetails.push("Username: " + user.username);
    for (let i = 0; i < userDetails.length; i++) {
      let li = document.createElement("li");
      li.innerText = userDetails[i];
      ul.appendChild(li);
    }
    getUserResult.appendChild(ul);
  }

  //GET ALL USERS
  const getAllUsers = document.getElementById("get_all_users");
  readUsers.addEventListener("click", () => {
    resetCreateForm();
    resetGetUserForm();
    childReadUsers[0].id = "active_user";
    getAllUsers.style.display = "flex";
    send_request_get_all();
  });

  function createGetUsersResult(users) {
    deleteElementNodes(getAllUsers);
    for (let i = 0; i < users.length; i++) {
      const div = document.createElement("div");
      let user = [];
      user.push("Id: " + users[i]._id);
      user.push("Type: " + users[i].type);
      user.push("Email: " + users[i].email);
      user.push("Username: " + users[i].username);
      const ul = document.createElement("ul");
      for (let j = 0; j < user.length; j++) {
        let li = document.createElement("li");
        li.innerText = user[j];
        ul.appendChild(li);
      }
      div.appendChild(ul);
      getAllUsers.appendChild(div);
    }
  }

  function deleteElementNodes(element) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
  }
});
