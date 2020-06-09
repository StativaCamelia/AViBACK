document.addEventListener("DOMContentLoaded", function () {
  const submitUrl = "http://localhost:5003/users?token=";

  const criteria = document.getElementById("criterii");
  const valueOfCriteria = document.getElementById("optiune");
  const submitCriteria = document.getElementById("submit_criteria");

  submitCriteria.addEventListener("click", handlerSubmitCriteria);

  function handlerSubmitCriteria(e) {
    e.preventDefault();
    prepareQueryString();
  }

  function concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
  }

  function prepareQueryString() {
    let queryString = "&";
    queryString += concatQueryString("", "criterii", criteria.value);
    queryString += concatQueryString("", "optiune", valueOfCriteria.value);
    patchUserOption(queryString.substring(1));
  }

  function patchUserOption(query) {
    let xhttp = new XMLHttpRequest();
    const token = localStorage.getItem("auth-token");
    const urlWithId = submitUrl + token + query;
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 201) {
        const { content } = JSON.parse(this.responseText);
      }
    };
    xhttp.open("put", urlWithId, true);
    xhttp.send();
  }
});
