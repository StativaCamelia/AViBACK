document.addEventListener("DOMContentLoaded", function updateNews(event) {
  function send_request() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const { content } = JSON.parse(this.responseText);
        counter.setAttribute("accidents", "Accidentele");
        counterInc();
      }
    };
    url = "news";
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  send_request();
});
