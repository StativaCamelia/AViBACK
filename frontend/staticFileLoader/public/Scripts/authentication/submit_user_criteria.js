document.addEventListener("DOMContentLoaded", postUserOption, false);
const url = "http://localhost:5003/users?token=";

const criteria = document.getElementById("criterii");
const valueOfCriteria = document.getElementById("optiune");

function concatQueryString(queryString, key, value) {
  queryString = queryString + "&";
  queryString = queryString + key + "=" + value;
  return queryString;
}

function prepareQueryString() {
  let queryString = "";
  queryString += concatQueryString("", "criterii", criteria);
  queryString += concatQueryString(queryString, "optiune", valueOfCriteria);
  postUserOption(queryString.substring(1));
}

function postUserOption(query) {
  console.log("aici");
  console.log(query);
  let xhttp = new XMLHttpRequest();
  const token = localStorage.getItem("auth-token");
  const urlWithId = url + token;
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 201) {
      const { content } = JSON.parse(this.responseText);
    }
  };
  url = api + query;
  xhttp.open("patch", urlWithId, true);
  xhttp.send();
}
