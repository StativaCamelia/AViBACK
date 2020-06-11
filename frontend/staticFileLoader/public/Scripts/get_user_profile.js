document.addEventListener("DOMContentLoaded", getUserProfile, false);
const url = "http://localhost:5003/users?token=";
let filtersOptions;
let optionValues = {
  State: "statesValues",
  County: "countiesValues",
  City: "citiesValues",
  Street: "streetsValues",
  Timezone: "timezoneValues",
};

function setUserProfile(user) {
  const email = document.querySelector("#email");
  const username = document.querySelector("#username");
  const criterii = document.getElementById("criterii");
  const valueOfCriteria = document.getElementById("optiune");
  email.innerText = user.email;
  username.innerText = user.username;
  if (user.criteria) {
    const option = document.querySelector("#" + user.criteria);
    option.setAttribute("selected", "");
  }
  if (user.valueOfCriteria) {
    const value = document.createElement("option");
    value.value = user.valueOfCriteria;
    value.selected = true;
    value.textContent = user.valueOfCriteria;
    valueOfCriteria.appendChild(value);
  }
}

function getOptions() {
  let xhttp = new XMLHttpRequest();
  const url = "http://localhost:5004/accidents/location";
  xhttp.open("get", url, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        filtersOptions = response.content;
      }
    }
  };
}

function setValuesOfCriteria() {
  const criterii = document.getElementById("criterii");
  criterii.addEventListener("change", addOptions);
}

function addOptions(event) {
  let options;
  if (this.value === "State") {
    options = filtersOptions[optionValues[this.value]].map(
      (field) => field.value
    );
    console.log(options);
  } else {
    options = filtersOptions[optionValues[this.value]];
  }
  createOptions(options, this.value);
}

function removeOldValues() {
  document.getElementById("optiune").options.length = 0;
}

function createOptions(options, value) {
  removeOldValues();
  const valueOfCriteria = document.getElementById("optiune");
  let option = document.createElement("option");
  option.setAttribute("selected", "");
  option.setAttribute("hidden", "");
  option.textContent = "Option";
  valueOfCriteria.appendChild(option);
  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option");
    option.value = options[i];
    option.innerText = options[i];
    valueOfCriteria.appendChild(option);
  }
}

function getUserProfile() {
  getOptions();
  let xhttp = new XMLHttpRequest();
  const token = localStorage.getItem("auth-token");
  const urlWithId = url + token;
  xhttp.open("get", urlWithId, true);
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      const response = JSON.parse(this.responseText);
      if (this.status === 200) {
        setUserProfile(response.content);
        return response.content;
      }
    }
  };

  setValuesOfCriteria();
}
