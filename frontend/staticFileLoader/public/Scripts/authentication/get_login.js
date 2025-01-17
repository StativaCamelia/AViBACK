document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("auth-token");
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4) {
      let profileLog = document.getElementById("button");
      if (this.status === 200 || this.status === 400 || this.status === 401) {
        const response = JSON.parse(this.responseText);
        const values = response.content.values;
        if(values.value === "LOGIN"){
          profileLog.innerText = "LOGIN";
          profileLog.id = "button";
          profileLog.href = "#";
        }else{
          if(values.value === "PROFILE"){
            profileLog.innerText = "MY PROFILE";
            profileLog.id = "profile";
            profileLog.href = "http://localhost:5002/profile";
          }else{
            if(values.value === "DASHBOARD"){
              profileLog.innerText = "DASHBOARD";
              profileLog.id = "dashboard";
              profileLog.href = "http://localhost:5002/dashboard";
            }
          }
        }
        profileLog.style.display = "initial";
      }
      if (this.status === 400) {
        alert("Authentication error!");
      }
      if (profileLog.id !== "button") {
        const logout = document.getElementById("logout");
        const windowUrl = window.location.href;
        const indexProfile = windowUrl.indexOf("profile");
        const indexDashboard = windowUrl.indexOf("dashboard");
        logout.style.display = "initial";
        logout.addEventListener("click",() => {
          localStorage.removeItem("auth-token");
          logout.style.display = "none";
          if(indexProfile !== -1){
            location.href = windowUrl.substring(0,indexProfile) + "home";
          }else{
            if(indexDashboard !== -1){
              location.href = windowUrl.substring(0,indexDashboard) + "home";
            }else{
              location.href = windowUrl;
            }
          }
        });
        if(indexProfile === -1 && indexDashboard === -1){
          profileLog.removeEventListener("click", loginListener);
        }
      }
    }
  };
  xhttp.open("get", "http://localhost:5003/users/login", true);
  xhttp.setRequestHeader("auth-token", token ? token : "");
  xhttp.send();
});
