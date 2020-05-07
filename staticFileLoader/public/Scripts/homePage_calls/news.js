document.addEventListener("DOMContentLoaded", function updateNews(event) {
  function changeElements(info) {
    var value = 0;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(info, "text/xml");
    var x = xmlDoc.getElementsByTagName("accident");
    var element;
    if (value == 4) value = 0;
    for (let i = 1; i <= 6; i++) {
      element = document.getElementById("news" + i);
      try {
        element.innerHTML = x[i + value - 1].firstChild.nodeValue;
      } catch (error) {}
    }
    setTimeout(function () {
      for (let i = 1; i <= 6; i++) {
        element = document.getElementById("news" + i);
        try {
          element.innerHTML = x[i + value - 1].firstChild.nodeValue;
        } catch (error) {}
      }
      value += 1;
      if (value < 10) changeElements();
    }, 10000);
  }

  function send_request() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        const { content } = JSON.parse(this.responseText);
        changeElements(content.details);
      }
    };
    url = "news";
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  send_request();
});
