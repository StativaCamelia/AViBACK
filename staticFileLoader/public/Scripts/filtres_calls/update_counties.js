document.addEventListener("DOMContentLoaded", function updateCounties(event) {
  var sel = document.querySelector("#country");
  sel.addEventListener("input", function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var county_selector = document.querySelector("#county");
        county_selector.innerHTML =
          '<option value="County" selected hidden>County</option>';
        const { content } = JSON.parse(this.responseText);

        for (counties of content) {
          var option = document.createElement("option");
          option.text = counties;
          option.value = counties;
          county_selector.add(option);
        }
      }
    };
    url = "states?state=" + this.value;
    xhttp.open("GET", url, true);
    xhttp.send();
  });
});
