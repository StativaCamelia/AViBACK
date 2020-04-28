document.addEventListener("DOMContentLoaded", function updateCounter(event) {
  var counter = document.querySelector("#data-target");

  var selector = counter;

  function send_request() {
    console.log(selection);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.status == 200) {
        counter.setAttribute("data-target", "10");
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  selector.addEventListener("GET", function () {
    send_request();
  });
});
