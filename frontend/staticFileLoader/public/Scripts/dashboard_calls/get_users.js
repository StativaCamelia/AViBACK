document.addEventListener("DOMContentLoaded", function () {
  const url = "http://localhost:5003/users";
  const authToken = localStorage.getItem("auth-token");
  const noDataFound = document.getElementById("no_data_found");
  function sendRequestCreate(
    emailValue,
    usernameValue,
    passwordValue,
    typeValue
  ) {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 201) {
          createUserMessage.innerText = "USER CREATED!";
        } else {
          console.log(response.error);
          createUserMessage.innerText = "USER NOT CREATED!";
        }
      }
    };
    xhttp.open("post", url, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    const values = {
      email: emailValue,
      username: usernameValue,
      password: passwordValue,
      type: typeValue,
    };
    xhttp.send(JSON.stringify(values));
  }

  function sendRequestGetById(userIdValue) {
    let xhttp = new XMLHttpRequest();
    const urlWithId = url + "/" + userIdValue;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          if(response.content){
            noDataFound.innerText = "";
            createGetUserResult(response.content);
          }else{
            noDataFound.innerText = "NO DATA FOUND!";
            resetGetUserForm("noData");
          }
        } else {
          console.log(response.error);
        }
      }
    };
    xhttp.open("get", urlWithId, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  function sendRequestGetAll() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          createGetUsersResult(response.content);
        } else {
          console.log(response.error);
        }
      }
    };
    xhttp.open("get", url, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  function sendRequestUpdate(userIdValue, user) {
    let xhttp = new XMLHttpRequest();
    const urlWithId = url + "/" + userIdValue;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          if(response.content){
            updateUserMessage.innerText = "USER UPDATED!";
            noDataFound.innerText = "";
          }else{
            updateUserMessage.innerText = "";
            noDataFound.innerText = "NO DATA FOUND!";
          }
        } else {
          console.log(response.error);
          updateUserMessage.innerText = "USER NOT UPDATED!";
        }
      }
    };xhttp.open("put", urlWithId, true);
    xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send(JSON.stringify(user));
  }

  function sendRequestDeleteById(userIdValue) {
    let xhttp = new XMLHttpRequest();
    const urlWithId = url + "/" + userIdValue;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          if(response.content){
            deleteUserMessage.innerText = "USER DELETED!";
            noDataFound.innerText = "";
          }else{
            noDataFound.innerText = "NO DATA FOUND!";
            deleteUserMessage.innerText = "";
          }
        } else {
          console.log(response.error);
          deleteUserMessage.innerText = "USER NOT DELETED!";
        }
      }
    };
    xhttp.open("delete", urlWithId, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  function sendRequestDeleteAll() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        const response = JSON.parse(this.responseText);
        if (this.status === 200) {
          deleteUsersMessage.innerText = "ALL USERS DELETED!";
        } else {
          console.log(response.error);
          deleteUsersMessage.innerText = "USERS NOT DELETED!";
        }
      }
    };
    xhttp.open("delete", url, true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  const createUser = document.getElementById("create_user");
  const childCreateUser = createUser.childNodes;
  const readUser = document.getElementById("read_user");
  const childReadUser = readUser.childNodes;
  const readUsers = document.getElementById("read_users");
  const childReadUsers = readUsers.childNodes;
  const updateUser = document.getElementById("update_user");
  const childUpdateUser = updateUser.childNodes;
  const deleteUser = document.getElementById("delete_user");
  const childDeleteUser = deleteUser.childNodes;
  const deleteAllUsers = document.getElementById("delete_all_users");
  const childDeleteUsers = deleteAllUsers.childNodes;

  function resetCreateUserForm() {
    createUserMessage.innerText = "";
    userFormCreate.style.display = "none";
    childCreateUser[0].id = "";
    noDataFound.innerText = "";
    resetCreateUserFields();
  }

  function resetCreateUserFields() {
    createUserEmail.value = "";
    createUserUsername.value = "";
    createUserPassword.value = "";
    createUserType.value = "";
  }

  function resetGetUserForm(text) {
    deleteElementNodes(getUserResult);
    if(!text){
      userFormGetUser.style.display = "none";
      childReadUser[0].id = "";
      getUserId.value = "";
      noDataFound.innerText = "";
    }
  }

  function resetGetAllUsers() {
    deleteElementNodes(getAllUsers);
    getAllUsers.style.display = "none";
    childReadUsers[0].id = "";
    noDataFound.innerText = "";
  }

  function resetUpdateUserForm() {
    updateUserMessage.innerText = "";
    userFormUpdate.style.display = "none";
    childUpdateUser[0].id = "";
    noDataFound.innerText = "";
    resetUpdateUserFields();
  }

  function resetUpdateUserFields() {
    updateUserId.value = "";
    updateUserEmail.value = "";
    updateUserUsername.value = "";
    updateUserType.value = "";
  }

  function resetDeleteUserForm() {
    deleteUserId.value = "";
    childDeleteUser[0].id = "";
    userFormDeleteUser.style.display = "none";
    deleteUserMessage.innerText = "";
    noDataFound.innerText = "";
  }

  function resetDeleteUsersForm() {
    childDeleteUsers[0].id = "";
    deleteAll.style.display = "none";
    deleteUsersMessage.innerText = "";
    noDataFound.innerText = "";
  }

  const userFormCreate = document.getElementById("user_form_create");
  const createUserMessage = document.getElementById("create_user_message");
  const createUserEmail = document.getElementById("create_user_email");
  const createUserUsername = document.getElementById("create_user_username");
  const createUserPassword = document.getElementById("create_user_password");
  const createUserType = document.getElementById("create_user_type");
  const submitCreateUser = document.getElementById("submit_create_user");

  createUser.addEventListener("click", () => {
    resetGetUserForm();
    resetGetAllUsers();
    resetUpdateUserForm();
    resetDeleteUserForm();
    resetDeleteUsersForm();
    childCreateUser[0].id = "active_user";
    userFormCreate.style.display = "flex";
    submitCreateUser.addEventListener("click", (e) => {
      e.preventDefault();
      const emailValue = createUserEmail.value;
      const usernameValue = createUserUsername.value;
      const passwordValue = createUserPassword.value;
      const typeValue = createUserType.value;
      sendRequestCreate(emailValue, usernameValue, passwordValue, typeValue);
    });
  });

  const userFormGetUser = document.getElementById("user_form_get_user");
  const getUserId = document.getElementById("get_user_id");
  const submitGetUser = document.getElementById("submit_get_user");
  const getUserResult = document.getElementById("get_user_result");
  readUser.addEventListener("click", () => {
    resetCreateUserForm();
    resetGetAllUsers();
    resetUpdateUserForm();
    resetDeleteUserForm();
    resetDeleteUsersForm();
    childReadUser[0].id = "active_user";
    userFormGetUser.style.display = "flex";
    submitGetUser.addEventListener("click", (e) => {
      e.preventDefault();
      const userIdValue = getUserId.value;
      sendRequestGetById(userIdValue);
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
    userDetails.push("Selected criterion: " + user.criteria + "-" + user.valueOfCriteria);
    for (let i = 0; i < userDetails.length; i++) {
      let li = document.createElement("li");
      li.innerText = userDetails[i];
      ul.appendChild(li);
    }
    getUserResult.appendChild(ul);
  }

  const getAllUsers = document.getElementById("get_all_users");
  readUsers.addEventListener("click", () => {
    resetCreateUserForm();
    resetGetUserForm();
    resetUpdateUserForm();
    resetDeleteUserForm();
    resetDeleteUsersForm();
    childReadUsers[0].id = "active_user";
    getAllUsers.style.display = "flex";
    sendRequestGetAll();
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
      user.push("Selected criterion: " + users[i].criteria + "-" + users[i].valueOfCriteria);
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

  const userFormUpdate = document.getElementById("user_form_update");
  const updateUserId = document.getElementById("update_user_id");
  const updateUserEmail = document.getElementById("update_user_email");
  const updateUserUsername = document.getElementById("update_user_username");
  const updateUserType = document.getElementById("update_user_type");
  const submitUpdateUser = document.getElementById("submit_update_user");
  const updateUserMessage = document.getElementById("update_user_message");
  updateUser.addEventListener("click", () => {
    resetCreateUserForm();
    resetGetUserForm();
    resetGetAllUsers();
    resetDeleteUserForm();
    resetDeleteUsersForm();
    childUpdateUser[0].id = "active_user";
    userFormUpdate.style.display = "flex";
    submitUpdateUser.addEventListener("click", (e) => {
      e.preventDefault();
      const userIdValue = updateUserId.value;
      const user = {};
      if (updateUserEmail.value !== "") {
        user.email = updateUserEmail.value;
      }
      if (updateUserUsername.value !== "") {
        user.username = updateUserUsername.value;
      }
      if (updateUserType.value !== "") {
        user.type = updateUserType.value;
      }
      sendRequestUpdate(userIdValue, user);
    });
  });

  const userFormDeleteUser = document.getElementById("user_form_delete_user");
  const deleteUserId = document.getElementById("delete_user_id");
  const submitDeleteUser = document.getElementById("submit_delete_user");
  const deleteUserMessage = document.getElementById("delete_user_message");
  deleteUser.addEventListener("click", () => {
    resetCreateUserForm();
    resetGetUserForm();
    resetGetAllUsers();
    resetUpdateUserForm();
    resetDeleteUsersForm();
    childDeleteUser[0].id = "active_user";
    userFormDeleteUser.style.display = "flex";
    submitDeleteUser.addEventListener("click", (e) => {
      e.preventDefault();
      const userId = deleteUserId.value;
      sendRequestDeleteById(userId);
    });
  });

  const deleteAll = document.getElementById("delete_all");
  const submitDeleteUsers = document.getElementById("submit_delete_users");
  const deleteUsersMessage = document.getElementById("delete_users_message");
  deleteAllUsers.addEventListener("click", () => {
    resetCreateUserForm();
    resetGetUserForm();
    resetGetAllUsers();
    resetUpdateUserForm();
    resetDeleteUserForm();
    childDeleteUsers[0].id = "active_user";
    deleteAll.style.display = "flex";
    submitDeleteUsers.addEventListener("click", (e) => {
      sendRequestDeleteAll();
    });
  });

  function deleteElementNodes(element) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
    }
  }
});
