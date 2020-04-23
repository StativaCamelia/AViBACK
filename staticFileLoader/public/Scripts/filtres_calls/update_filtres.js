document.addEventListener("DOMContentLoaded", function updateCounties(event) {
  var location_entities = [
    "timezone",
    "state",
    "county",
    "city",
    "street",
    "number",
  ];

  var state = document.querySelector("#state");
  var county = document.querySelector("#county");
  var city = document.querySelector("#city");
  var street = document.querySelector("#street");
  var number = document.querySelector("#number");
  var timezone = document.querySelector("#timezone");

  var selectors = [timezone, state, county, city, street, number];

  function change_options(location_type, response) {
    var selector = document.querySelector("#" + location_type);
    selector.innerHTML =
      '<option value="' +
      location_type +
      '"selected hidden>' +
      location_type.charAt(0).toUpperCase() +
      location_type.slice(1) +
      "</option>";

    const { content } = JSON.parse(response);
    for (element of content) {
      var option = document.createElement("option");
      option.text = element;
      option.value = element;
      selector.add(option);
    }
  }

  function send_request(selection, sub_selection, value) {
    console.log(selection);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        change_options(location_entities[sub_selection], this.responseText);
      }
    };
    url =
      location_entities[sub_selection] +
      "?" +
      location_entities[selection] +
      "=" +
      value;
    xhttp.open("GET", url, true);
    xhttp.send();
  }

  selectors[0].addEventListener("input", function () {
    for (var j = 1; j < selectors.length - 1; j++) {
      send_request(0, j, this.value);
    }
  });

  selectors[1].addEventListener("input", function () {
    for (var j = 2; j < selectors.length - 1; j++) {
      send_request(1, j, this.value);
    }
  });

  selectors[2].addEventListener("input", function () {
    for (var j = 3; j < selectors.length - 1; j++) {
      send_request(2, j, this.value);
    }
  });
});
