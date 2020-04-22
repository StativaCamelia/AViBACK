document.addEventListener("DOMContentLoaded", function updateCounties(event) {
  var sel = document.querySelector("#country");
  sel.addEventListener("input", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ci").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "ajax_info.txt", true);
    xhttp.send();
    console.log(this.value);
  });
});
