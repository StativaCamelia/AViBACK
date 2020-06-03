var dim = window.matchMedia("(max-width: 800px)");
var coordinates = {
  AL: {
    latitude: "32.806",
    longitudine: "-86.791",
  },
  AK: {
    latitude: "61.370",
    longitudine: "-152.404",
  },
  AZ: {
    latitude: "33.729",
    longitudine: "-111.431",
  },
  AR: {
    latitude: "34.969",
    longitudine: "-92.373",
  },
  CA: {
    latitude: "36.116",
    longitudine: "-119.681",
  },
  CO: {
    latitude: "39.059",
    longitudine: "-105.31",
  },
  CT: {
    latitude: "41.597",
    longitudine: "-72.755",
  },
  DE: {
    latitude: "39.318",
    longitudine: "-75.507",
  },
  FL: {
    latitude: "27.766",
    longitudine: "-81.686",
  },
  GA: {
    latitude: "33.040",
    longitudine: "-83.643",
  },
  HI: {
    latitude: "21.094",
    longitudine: "-157.498",
  },
  ID: {
    latitude: "44.240",
    longitudine: "-114.478",
  },
  IL: {
    latitude: "40.349",
    longitudine: "-88.986",
  },
  IN: {
    latitude: "39.849",
    longitudine: "-86.258",
  },
  IA: {
    latitude: "42.011",
    longitudine: "-93.210",
  },
  KS: {
    latitude: "38.526",
    longitudine: "-96.726",
  },
  KY: {
    latitude: "37.668",
    longitudine: "-84.670",
  },
  LA: {
    latitude: "31.169",
    longitudine: "-91.867",
  },
  ME: {
    latitude: "44.693",
    longitudine: "-69.381",
  },
  MD: {
    latitude: "39.063",
    longitudine: "-76.802",
  },
  MA: {
    latitude: "42.230",
    longitudine: "-71.530",
  },
  MI: {
    latitude: "43.326",
    longitudine: "-84.536",
  },
  MN: {
    latitude: "45.694",
    longitudine: "-93.900",
  },
  MS: {
    latitude: "32.741",
    longitudine: "-89.678",
  },
  MO: {
    latitude: "38.456",
    longitudine: "-92.288",
  },
  MT: {
    latitude: "46.921",
    longitudine: "-110.454",
  },
  NE: {
    latitude: "41.125",
    longitudine: "-98.268",
  },
  NV: {
    latitude: "38.313",
    longitudine: "-117.055",
  },
  NH: {
    latitude: "43.452",
    longitudine: "-71.563",
  },
  NJ: {
    latitude: "40.298",
    longitudine: "-74.521",
  },
  NM: {
    latitude: "34.840",
    longitudine: "-106.248",
  },
  NY: {
    latitude: "42.165",
    longitudine: "-74.948",
  },
  NC: {
    latitude: "35.630",
    longitudine: "-79.806",
  },
  ND: {
    latitude: "47.528",
    longitudine: "-99.784",
  },
  OH: {
    latitude: "40.388",
    longitudine: "-82.764",
  },
  OK: {
    latitude: "35.565",
    longitudine: "-96.928",
  },
  OR: {
    latitude: "44.572",
    longitudine: "-122.070",
  },
  PA: {
    latitude: "40.590",
    longitudine: "-77.209",
  },
  RI: {
    latitude: "41.680",
    longitudine: "-71.511",
  },
  SC: {
    latitude: "33.856",
    longitudine: "-80.945",
  },
  SD: {
    latitude: "44.299",
    longitudine: "-99.438",
  },
  TN: {
    latitude: "35.747",
    longitudine: "-86.692",
  },
  TX: {
    latitude: "31.054",
    longitudine: "-97.563",
  },
  UT: {
    latitude: "40.150",
    longitudine: "-111.862",
  },
  VT: {
    latitude: "44.045",
    longitudine: "-72.710",
  },
  VA: {
    latitude: "37.769",
    longitudine: "-78.169",
  },
  WA: {
    latitude: "47.400",
    longitudine: "-121.490",
  },
  WV: {
    latitude: "38.491",
    longitudine: "-80.954",
  },
  WI: {
    latitude: "44.268",
    longitudine: "-89.616",
  },
  WY: {
    latitude: "42.755",
    longitudine: "-107.302",
  },
};
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
  WY: "./Images/Flags/Wyoming.png",
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
  PR: "Puerto Rico",
};

document.addEventListener("DOMContentLoaded", function showPop(event) {
  var svgStates = document.querySelectorAll("#states > *");
  var leave = document.getElementById("right_cont");
  var pop = document.getElementById("states_pop");
  var left = pop.childNodes[0];
  var right = pop.childNodes[1];
  var map = document.getElementById("map");

  svgStates.forEach(function (el) {
    var iconPos = el.getBoundingClientRect();
    if (dim.matches) {
      el.addEventListener(
        "click",
        function () {
          pop.style.display = "flex";
          pop.style.top = window.scrollY + 140 + "px";
          left.innerText =
            '<div class = "pop_text"><p>' +
            dict_names[el.getAttribute("id")] +
            "</p>";
          if (el.hasAttribute("count"))
            left.innerText += "<p>" + el.getAttribute("count") + "</p></div>";

          left.innerText +=
            '<div class = "pop_img"><img src="' +
            dict_img[el.getAttribute("id")] +
            '"></div>';
          map.setAttribute(
            "latitude",
            coordinates[el.getAttribute("id")].latitude
          );
          map.setAttribute(
            "longitude",
            coordinates[el.getAttribute("id")].longitudine
          );
          google.maps.event.addDomListener(window, "load", initMap());
        },
        { passive: true }
      );

      window.addEventListener(
        "scroll",
        function () {
          pop.style.display = "none";
          pop.style.left = iconPos.right;
          pop.style.top = window.scrollY + iconPos.top + "px";
        },
        { passive: true }
      );
    } else {
      leave.addEventListener(
        "mouseenter",
        function () {
          pop.style.display = "none";
          pop.style.left = iconPos.right;
          pop.style.top = window.scrollY + iconPos.top + "px";
        },
        { passive: true }
      );

      el.addEventListener(
        "mouseenter",
        function () {
          pop.style.display = "flex";
          pop.style.left = iconPos.right + "px";
          pop.style.top = window.scrollY + iconPos.top + "px";
          left.innerText =
            '<div class = "pop_text"><p>' +
            dict_names[el.getAttribute("id")] +
            "</p>";
          if (el.hasAttribute("count"))
            left.innerText += "<p>" + el.getAttribute("count") + "</p></div>";

          left.innerText +=
            '<div class = "pop_img"><img src="' +
            dict_img[el.getAttribute("id")] +
            '"></div>';
          map.setAttribute(
            "latitude",
            coordinates[el.getAttribute("id")].latitude
          );
          map.setAttribute(
            "longitude",
            coordinates[el.getAttribute("id")].longitudine
          );
          google.maps.event.addDomListener(window, "load", initMap());
        },
        { passive: true }
      );

      var sel = document.querySelector(".options");
      sel.addEventListener(
        "input",
        function () {
          for (var key in dict_names)
            if (dict_names[key] === this.value) state = key;
          var el = document.getElementById(state);
          var iconPos = el.getBoundingClientRect();
          pop.style.display = "flex";
          pop.style.left = iconPos.right + "px";
          pop.style.top = window.scrollY + iconPos.top + "px";
          left.innerText =
            '<div class = "pop_text"><p>' +
            dict_names[el.getAttribute("id")] +
            "</p>";
          if (el.hasAttribute("count"))
            left.innerText += "<p>" + el.getAttribute("count") + "</p></div>";

          left.innerText +=
            '<div class = "pop_img"><img src="' +
            dict_img[el.getAttribute("id")] +
            '"></div>';
          map.setAttribute(
            "latitude",
            coordinates[el.getAttribute("id")].latitude
          );
          map.setAttribute(
            "longitude",
            coordinates[el.getAttribute("id")].longitudine
          );
          google.maps.event.addDomListener(window, "load", initMap());
        },
        { passive: true }
      );
    }
  });
});
