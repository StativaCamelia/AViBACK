document.addEventListener("DOMContentLoaded", function updateCounter(event) {
  var counter = document.querySelector(".counter_numbers p");

  function send_request() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        counter.setAttribute("data-target", 10);
      }
    };
    url = "counter";
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  send_request();
});
