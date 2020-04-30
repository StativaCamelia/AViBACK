document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("auth-token");
  console.log("get " + token);
  let xhttp = new XMLHttpRequest();
  xhttp.open("get", "http://localhost:5001/user/login", true);
  xhttp.setRequestHeader("auth-token", token ? token : "");
  xhttp.send();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let profileLog = document.getElementById("button");
      if (this.status === 200 || this.status === 400 || this.status === 401) {
        const values = JSON.parse(this.responseText);
        console.log(values.value);
        profileLog.innerText = values.value;
        profileLog.id = values.id;
        profileLog.href = values.href;
      }
      if (this.status === 400) {
        //token err
        console.log(this.responseText);
        alert("Authentification error!");
      }
      if (this.status === 200) {
        profileLog.id = "active";
      }
    }
  };
});
