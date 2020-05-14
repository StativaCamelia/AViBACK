document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("auth-token");
  let xhttp = new XMLHttpRequest();
  xhttp.open("get", "http://localhost:5003/user/login", true);
  xhttp.setRequestHeader("auth-token", token ? token : "");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let profileLog = document.getElementById("button");
      if (this.status === 200 || this.status === 400 || this.status === 401) {
        const response = JSON.parse(this.responseText);
        const values = response.content.values;
        console.log(response)
        console.log(values)
        profileLog.innerText = values.value;
        profileLog.id = values.id;
        profileLog.href = values.href;
      }
      if (this.status === 400) {
        alert("Authentification error!");
      }
      if (profileLog.id !== "button") {
        profileLog.removeEventListener("click", loginListener);
      }
    }
  };
});
