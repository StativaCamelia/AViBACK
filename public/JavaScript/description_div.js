var dim = window.matchMedia("(max-width: 800px)");
var dict_img = {
  AL: "./Images/Flags/Alabama.png",
  AK: "./Images/Flags/Alaska.png",
  AZ: "./Images/Flags/Arizona.png",
  AR: "./Images/Flags/Arkansas.png",
  CA: "./Images/Flags/California.png",
  CO: "./Images/Flags/Colorado.png",
  CT: "./Images/Flags/Connecticut.png",
  DE: "./Images/Flags/Delaware.png",
  FL: "./Images/Flags/Florida.png",
  GA: "./Images/Flags/Georgia.png",
  HI: "./Images/Flags/Hawaii.png",
  ID: "./Images/Flags/Idaho.png",
  IL: "./Images/Flags/Illinois.png",
  IN: "./Images/Flags/Indiana.png",
  IA: "./Images/Flags/Iowa.png",
  KS: "./Images/Flags/Kansas.png",
  KY: "./Images/Flags/Kentucky.png",
  LA: "./Images/Flags/Louisiana.png",
  ME: "./Images/Flags/Maine.png",
  MD: "./Images/Flags/Maryland.png",
  MA: "./Images/Flags/Massachusetts.png",
  MI: "./Images/Flags/Michigan.png",
  MN: "./Images/Flags/Minnesota.png",
  MS: "./Images/Flags/Mississippi.png",
  MO: "./Images/Flags/Missouri.png",
  MT: "./Images/Flags/Montana.png",
  NE: "./Images/Flags/Nebraska.png",
  NV: "./Images/Flags/Nevada.png",
  NH: "./Images/Flags/New_Hampshire.png",
  NJ: "./Images/Flags/New_Jersey.png",
  NM: "./Images/Flags/New_Mexico.png",
  NY: "./Images/Flags/New_York.png",
  NC: "./Images/Flags/North_Carolina.png",
  ND: "./Images/Flags/North_Dakota.png",
  OH: "./Images/Flags/Ohio.png",
  OK: "./Images/Flags/Oklahoma.png",
  OR: "./Images/Flags/Oregon.png",
  PA: "./Images/Flags/Pennsylvania.png",
  RI: "./Images/Flags/Rhode_Island.png",
  SC: "./Images/Flags/South_Carolina.png",
  SD: "./Images/Flags/South_Dakota.png",
  TN: "./Images/Flags/Tennessee.png",
  TX: "./Images/Flags/Texas.png",
  UT: "./Images/Flags/Utah.png",
  VT: "./Images/Flags/Vermont.png",
  VA: "./Images/Flags/Virginia.png",
  WA: "./Images/Flags/Washington.png",
  WV: "./Images/Flags/West_Virginia.png",
  WI: "./Images/Flags/Wisconsin.png",
  WY: "./Images/Flags/Wyoming.png"
};

var dict_names = {
  AL: "Alabama",
  AK: "Alaska",
  AZ: "Arizona",
  AR: "Arkansas",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DE: "Delaware",
  DC: "District of Columbia",
  FL: "Florida",
  GA: "Georgia",
  HI: "Hawaii",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  IA: "Iowa",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  ME: "Maine",
  MD: "Maryland",
  MA: "Massachusetts",
  MI: "Michigan",
  MN: "Minnesota",
  MS: "Mississippi",
  MO: "Missouri",
  MT: "Montana",
  NE: "Nebraska",
  NV: "Nevada",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NY: "New York",
  NC: "North Carolina",
  ND: "North Dakota",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VT: "Vermont",
  VA: "Virginia",
  WA: "Washington",
  WV: "West Virginia",
  WI: "Wisconsin",
  WY: "Wyoming",
  AS: "American Samoa",
  GU: "Guam",
  MP: "Northern Mariana Islands",
  PR: "Puerto Rico"
};

document.addEventListener("DOMContentLoaded", function showPop(event) {
  var svgStates = document.querySelectorAll("#states > *");
  var leave = document.getElementById("right_cont");
  var pop = document.getElementById("states_pop");

  var right = pop.childNodes[3];
  var left = pop.childNodes[1];
  var optionsStates = document.querySelectorAll("select>option");

  window.onresize = function(event) {
    document.location.reload(true);
  };

  svgStates.forEach(function(el) {
    var iconPos = el.getBoundingClientRect();
    if (dim.matches) {
      el.addEventListener("click", function() {
        pop.style.display = "flex";
        pop.style.top = window.scrollY + 140 + "px";
        left.innerHTML =
          '<div class = "pop_text"><p>' +
          dict_names[el.getAttribute("id")] +
          "</p></div>";
        left.innerHTML +=
          '<div class = "pop_img"><img src="' +
          dict_img[el.getAttribute("id")] +
          '"></div>';
      });

      window.addEventListener("scroll", function() {
        pop.style.display = "none";
        pop.style.left = iconPos.right;
        pop.style.top = window.scrollY + iconPos.top + "px";
      });
      el.addEventListener("mouseenter", function() {
        pop.style.display = "none";
        pop.style.left = iconPos.right;
        pop.style.top = window.scrollY + iconPos.top + "px";
      });
    } else {
      leave.addEventListener("mouseenter", function() {
        pop.style.display = "none";
        pop.style.left = iconPos.right;
        pop.style.top = window.scrollY + iconPos.top + "px";
      });

      el.addEventListener("mouseenter", function() {
        pop.style.display = "flex";
        pop.style.left = iconPos.right + "px";
        pop.style.top = window.scrollY + iconPos.top + "px";
        left.innerHTML =
          '<div class = "pop_text"><p>' +
          dict_names[el.getAttribute("id")] +
          "</p></div>";
        left.innerHTML +=
          '<div class = "pop_img"><img src="' +
          dict_img[el.getAttribute("id")] +
          '"></div>';
      });

      var sel = document.querySelector(".options");
      sel.addEventListener("input", function() {
        for (var key in dict_names)
          if (dict_names[key] === this.value) state = key;
        var el = document.getElementById(state);
        var iconPos = el.getBoundingClientRect();
        pop.style.display = "flex";
        pop.style.left = iconPos.right + "px";
        pop.style.top = window.scrollY + iconPos.top + "px";
        left.innerHTML =
          '<div class = "pop_text"><p>' +
          dict_names[el.getAttribute("id")] +
          "</p></div>";
        left.innerHTML +=
          '<div class = "pop_img"><img src="' +
          dict_img[el.getAttribute("id")] +
          '"></div>';
      });
    }
  });
});
