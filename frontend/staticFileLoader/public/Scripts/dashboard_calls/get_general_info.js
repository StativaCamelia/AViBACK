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

    function sendRequestDashboardUsers(){
        let xhttp = new XMLHttpRequest();
        xhttp.open("get", usersUrl + "general", true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    const users = response.content;
                    setUsersDetails(users);
                }
            }
        };
    }

    function sendRequestDashboardAccidents(){
        let xhttp = new XMLHttpRequest();
        xhttp.open("get", accidentsUrl + "general", true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                if (this.status === 200) {
                    const response = JSON.parse(this.responseText);
                    const accidents = response.content;
                    setAccidentsDetails(accidents);
                }
            }
        };
    }

    function setUsersDetails(users) {
        const content = usersNumber.innerHTML;
        usersNumber.innerHTML = content.substring(0,10) + " " + users.usersNumber + " users";
        newUsers.innerHTML = users.newUsersNumber + " new users";
        deletedUsers.innerHTML = users.deletedUsersNumber + " deleted users";
        updatedUsers.innerHTML = users.updatedUsersNumber + " updated users";
    }

    function setAccidentsDetails(accidents) {
        const content = accidentsNumber.innerHTML;
        accidentsNumber.innerHTML = content.substring(0,10) + " " + accidents.accidentsNumber + " accidents";
        newAccidents.innerHTML = accidents.newAccidentsNumber + " new accidents";
        deletedAccidents.innerHTML = accidents.deletedAccidentsNumber + " deleted accidents";
        updatedAccidents.innerHTML = accidents.updatedAccidentsNumber + " updated accidents";
    }

    sendRequestDashboardUsers();
    sendRequestDashboardAccidents();
});
