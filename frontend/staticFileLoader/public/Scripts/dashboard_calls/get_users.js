document.addEventListener("DOMContentLoaded", function getUsers(event) {
  var user_button = document.getElementById("user_button");

  function send_request() {
    const token = localStorage.getItem("auth-token");

    var xhttp = new XMLHttpRequest();
    url = "user";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("auth-token", token ? token : "");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const response = JSON.parse(this.response);
        const { content } = response;
        if (this.status === 403) {
          alert("Forbiden");
        }
      }
    };
  }

  user_button.addEventListener("click", function () {
    send_request();
  });
});
