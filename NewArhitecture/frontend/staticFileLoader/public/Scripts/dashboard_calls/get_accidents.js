document.addEventListener("DOMContentLoaded", function getAccident(event) {
  var accident_button = document.getElementById("accident_button");

  function send_request() {
    const token = localStorage.getItem("auth-token");

    var xhttp = new XMLHttpRequest();
    url = "accident";
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("auth-token", token ? token : "");
    xhttp.send();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        const response = JSON.parse(this.response);
        const { content } = response;
        console.log(content);
        if (this.status === 403) {
          alert("Forbiden");
        }
      }
    };
  }

  accident_button.addEventListener("click", function () {
    send_request();
  });
});
