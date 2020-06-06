document.addEventListener("DOMContentLoaded", function updateCounter(event) {
  var counter = document.querySelector(".counter_numbers p");

  var i = 0;
  function counterInc(value = 10) {
    const count = document.querySelector(".counter_numbers p");
    const target = count.getAttribute("data-target");
    setTimeout(function () {
      count.innerText = i;
      i++;
      if (i < target) {
        counterInc();
      }
    }, 4);
  }

  function send_request() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        const { content } = JSON.parse(this.responseText);
        counter.setAttribute("data-target", content);
        counterInc();
      }
    };
    const url = "http://localhost:5004/accidents/byDate";
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  send_request();
});
