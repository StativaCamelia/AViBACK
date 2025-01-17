document.addEventListener("DOMContentLoaded", function () {
  const authToken = localStorage.getItem("auth-token");
  const usersUrl = "http://localhost:5003/users/";
  const accidentsUrl = "http://localhost:5004/accidents/";
  const usersNumber = document.getElementById("users_number");
  const newUsers = document.getElementById("new_users");
  const deletedUsers = document.getElementById("deleted_users");
  const updatedUsers = document.getElementById("updated_users");
  const accidentsNumber = document.getElementById("accidents_number");
  const newAccidents = document.getElementById("new_accidents");
  const deletedAccidents = document.getElementById("deleted_accidents");
  const updatedAccidents = document.getElementById("updated_accidents");

  function sendRequestDashboardUsers() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const response = JSON.parse(this.responseText);
          const users = response.content;
          setUsersDetails(users);
        }
      }
    };
    xhttp.open("get", usersUrl + "general", true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  function sendRequestDashboardAccidents() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4) {
        if (this.status === 200) {
          const response = JSON.parse(this.responseText);
          const accidents = response.content;
          setAccidentsDetails(accidents);
        }
      }
    };
    xhttp.open("get", accidentsUrl + "general", true);
    xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
    xhttp.send();
  }

  function setUsersDetails(users) {
    const content = usersNumber.innerText;
    usersNumber.innerText =
      content.substring(0, 10) + " " + users.usersNumber + " users";
    newUsers.innerText = users.newUsersNumber + " new users";
    deletedUsers.innerText = users.deletedUsersNumber + " deleted users";
    updatedUsers.innerText = users.updatedUsersNumber + " updated users";
  }

  function setAccidentsDetails(accidents) {
    const content = accidentsNumber.innerText;
    accidentsNumber.innerText =
      content.substring(0, 10) + " " + accidents.accidentsNumber + " accidents";
    newAccidents.innerText = accidents.newAccidentsNumber + " new accidents";
    deletedAccidents.innerText =
      accidents.deletedAccidentsNumber + " deleted accidents";
    updatedAccidents.innerText =
      accidents.updatedAccidentsNumber + " updated accidents";
  }

  sendRequestDashboardUsers();
  sendRequestDashboardAccidents();
});
