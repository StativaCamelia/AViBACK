document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";
  let filtersValues;
  const exportData = document.querySelector(".export");
  const csvExport = document.getElementById("csv_export");
  const pngExport = document.getElementById("png_export");
  const svgExport = document.getElementById("svg_export");
  const state = document.getElementById("state");
  const county = document.getElementById("county");
  const city = document.getElementById("city");
  const street = document.getElementById("street");
  const number = document.getElementById("number");
  const timezone = document.getElementById("timezone");
  const roadSide = document.getElementById("road_side");
  const weather = document.getElementById("Weather_Condition");
  const windDirection = document.getElementById("Wind_Direction");
  const temperature1 = document.getElementById("temperature1");
  const temperature2 = document.getElementById("temperature2");
  const windChill1 = document.getElementById("wind_chill1");
  const windChill2 = document.getElementById("wind_chill2");
  const windSpeed1 = document.getElementById("wind_speed1");
  const windSpeed2 = document.getElementById("wind_speed2");
  const humidity1 = document.getElementById("humidity1");
  const humidity2 = document.getElementById("humidity2");
  const pressure1 = document.getElementById("pressure1");
  const pressure2 = document.getElementById("pressure2");
  const visibility1 = document.getElementById("visibility1");
  const visibility2 = document.getElementById("visibility2");
  const precipitation1 = document.getElementById("precipitation1");
  const precipitation2 = document.getElementById("precipitation2");
  const amenity = document.getElementById("amenity");
  const bump = document.getElementById("bump");
  const crossing = document.getElementById("crossing");
  const giveWay = document.getElementById("give_way");
  const junction = document.getElementById("junction");
  const noExit = document.getElementById("no_exit");
  const railway = document.getElementById("Railway");
  const roundabout = document.getElementById("Roundabout");
  const trafficCalming = document.getElementById("Traffic_Calming");
  const stop = document.getElementById("Stop");
  const station = document.getElementById("Station");
  const trafficSignal = document.getElementById("Traffic_Signal");
  const accidentDateStart = document.getElementById("accident_date_start");
  const accidentDateEnd = document.getElementById("accident_date_end");
  const severity = document.getElementById("severity");
  const accidentHourStart = document.getElementById("accident_hour_start");
  const accidentHourEnd = document.getElementById("accident_hour_end");
  const sunriseSunsetDay = document.getElementById("sunrise_sunset_day");
  const sunriseSunsetNight = document.getElementById("sunrise_sunset_night");
  const civilTwilightDay = document.getElementById("civil_twilight_day");
  const civilTwilightNight = document.getElementById("civil_twilight_night");
  const nauticalTwilightDay = document.getElementById("nautical_twilight_day");
  const nauticalTwilightNight = document.getElementById(
    "nautical_twilight_night"
  );
  const astronomicalTwilightDay = document.getElementById(
    "astronomical_twilight_day"
  );
  const astronomicalTwilightNight = document.getElementById(
    "astronomical_twilight_night"
  );
  const valuesLikeNamesComponents = [
    state,
    county,
    city,
    street,
    number,
    timezone,
    weather,
    windDirection,
  ];
  const valuesTrueFalseComponents = [
    amenity,
    bump,
    crossing,
    giveWay,
    junction,
    noExit,
    railway,
    roundabout,
    trafficCalming,
    stop,
    station,
    trafficSignal,
  ];
  const dateValuesComponents = [
    accidentDateStart,
    accidentDateEnd,
    accidentHourStart,
    accidentHourEnd,
  ];
  const valuesDayComponents = [
    sunriseSunsetDay,
    civilTwilightDay,
    nauticalTwilightDay,
    astronomicalTwilightDay,
  ];
  const valuesNightComponents = [
    sunriseSunsetNight,
    civilTwilightNight,
    nauticalTwilightNight,
    astronomicalTwilightNight,
  ];
  const lowerValuesComponents = [
    temperature1,
    windChill1,
    windSpeed1,
    pressure1,
    precipitation1,
    humidity1,
    visibility1,
  ];
  const higherValuesComponents = [
    temperature2,
    windChill2,
    windSpeed2,
    pressure2,
    precipitation2,
    humidity2,
    visibility2,
  ];
  const submitFilters = document.getElementById("submit_button");
  let message = document.getElementById("filter_message");
  const lowerValues = [
    "Temperature1",
    "Wind_Chill1",
    "Wind_Speed1",
    "Pressure1",
    "Precipitation1",
    "Humidity1",
    "Visibility1",
  ];
  const higherValues = [
    "Temperature2",
    "Wind_Chill2",
    "Wind_Speed2",
    "Pressure2",
    "Precipitation2",
    "Humidity2",
    "Visibility2",
  ];
  const weatherNames = [
    "Temperature",
    "Wind Chill",
    "Wind Speed",
    "Pressure",
    "Precipitation",
    "Humidity",
    "Visibility",
  ];
  const valuesLikeNames = [
    "state",
    "county",
    "city",
    "street",
    "number",
    "timezone",
    "weather_Condition",
    "wind_Direction",
  ];
  const valuesTrueFalse = [
    "Amenity",
    "Bump",
    "Crossing",
    "Give_Way",
    "Junction",
    "No_Exit",
    "Railway",
    "Roundabout",
    "Traffic_Calming",
    "Stop",
    "Station",
    "Traffic_Signal",
  ];
  const dateValues = ["FirstDate", "SecondDate", "FirstHour", "SecondHour"];
  const valuesDayNight = [
    "Sunrise_Sunset",
    "Civil_Twilight",
    "Nautical_Twilight",
    "Astronomical_Twilight",
  ];

  function up() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? "flex" : "none";
  }

  function loadingState(stop, start) {
    setVisible("#left_cont", stop);
    setVisible("#loading", start);
  }

  function resetFiltres() {
    const filtresForm = document.getElementById("filters_form");
    filtresForm.reset();
    resetSelect();
  }

  function send_request(query) {
    var xhttp = new XMLHttpRequest();
    url = api + query;
    xhttp.open(method, url, true);
    xhttp.send();
    loadingState(false, true);
    up();
    xhttp.onreadystatechange = function () {
      if (this.readyState === 4 && this.status === 200) {
        loadingState(true, false);
        const {content} = JSON.parse(this.responseText);
        removeExportListeners();
        if (content.boudaries) {
          resetFiltres();
          history(content.boudaries);
          color_map(content.dataset, content.boudaries);
          exportFunction(content.dataset);
        } else {
          resetFiltres();
          color_light();
          open_map(content);
        }
      }
    }
  }

  function color_light(){
    var levels = ["high_s", "medium_s", "low_s"];
  var svgStates = document.querySelectorAll("#states > *");
  svgStates.forEach(function (el) {
    setAttributesPath(el, "#edeff1", levels[3]);
    el.setAttribute("count", 0);
  });
  }

  function removeExportListeners() {
    csvExport.removeEventListener("click", handlerCSVExport);
    pngExport.removeEventListener("click", generatePngFormat);
    svgExport.removeEventListener("click", generateSvgFormat);
  }

  function exportFunction(dataset) {
    exportData.style.display = "flex";
    csvExport.addEventListener("click", handlerCSVExport);
    pngExport.addEventListener("click", handlerPngExport);
    svgExport.addEventListener("click", handlerSVGExport);
  }

  function handlerSVGExport() {
    const svgData = generateSvgFormat();
    downloadSvg(svgData);
  }

  function handlerCSVExport(dataset) {
    const csvData = generateCsvFormat(dataset);
    downloadCsv(csvData);
  }

  function handlerPngExport() {
    const pngData = generatePngFormat();
  }

  function generatePngFormat() {
    var svg = document.getElementById("svg_map");
    var svgData = new XMLSerializer().serializeToString(svg);
    var canvas = document.createElement("canvas");
    var svgSize = svg.getBoundingClientRect();
    canvas.width = svgSize.width * 3;
    canvas.height = svgSize.height * 3;
    canvas.style.width = svgSize.width;
    canvas.style.height = svgSize.height;
    var ctx = canvas.getContext("2d");
    ctx.scale(1, 1);
    var img = document.createElement("img");
    img.setAttribute(
      "src",
      "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)))
    );
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      var canvasdata = canvas.toDataURL("image/png", 1);
      downloadPng(canvasdata);
    };
  }

  function downloadPng(canvasdata) {
    const pngimg = document.createElement("img");
    pngimg.src = canvasdata;
    var a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", canvasdata);
    a.setAttribute("download", "AVi-statistics_map.png");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function downloadCsv(csvData) {
    const blob = new Blob([csvData], {
      type: "text/csv",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "AVi-statistics.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function generateCsvFormat(dataset) {
    let csvRows = [];
    var svgStates = document.querySelectorAll("#states > *");
    let headers = Object.keys(filtersValues);
    let selectedValues = [];
    headers.map((key) => selectedValues.push(filtersValues[key]));
    headers.push("State");
    headers.push("Accidents_No.");
    csvRows.push(headers.join(","));
    for (let i = 0; i < svgStates.length; i++) {
      let values = [];
      for (let j = 0; j < selectedValues.length; j++) {
        const escaped = ("" + selectedValues[j]).replace(/"/g, '\\"');
        values.push(`"${escaped}"`);
      }
      values.push(`${svgStates[i].getAttribute("id")}`);
      values.push(`${svgStates[i].getAttribute("count")}`);
      csvRows.push(values.join(","));
    }
    return csvRows.join("\n");
  }

  function generateSvgFormat() {
    var svg = document.getElementById("svg_map");
    var b64Start = "data:image/svg+xml;charset=utf8,";
    svg64 = encodeURIComponent(serializeString(svg));
    var image64 = b64Start + svg64;
    var url = +encodeURIComponent(serializeString(svg));
    return image64;
  }

  function serializeString(svg) {
    const xmlns = "http://www.w3.org/2000/xmlns/";
    const xlinkns = "http://www.w3.org/1999/xlink";
    const svgns = "http://www.w3.org/2000/svg";
    svg = svg.cloneNode(true);
    const fragment = window.location.href + "#";
    const walker = document.createTreeWalker(
      svg,
      NodeFilter.SHOW_ELEMENT,
      null,
      false
    );
    while (walker.nextNode()) {
      for (const attr of walker.currentNode.attributes) {
        if (attr.value.includes(fragment)) {
          attr.value = attr.value.replace(fragment, "#");
        }
      }
    }
    svg.setAttributeNS(xmlns, "xmlns", svgns);
    svg.setAttributeNS(xmlns, "xmlns:xlink", xlinkns);
    const serializer = new XMLSerializer();
    const string = serializer.serializeToString(svg);
    return string;
  }

  function downloadSvg(image64) {
    const url = image64;
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "AVi-statistics.svg");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }
  submitFilters.addEventListener("click", handlerSubmitFilters);

  function handlerSubmitFilters(e) {
    e.preventDefault();
    filtersValues = {};
    let queryString = "";
    const pageTypeIndex = window.location.href.lastIndexOf("/");
    const pageType = window.location.href.substring(pageTypeIndex + 1);
    queryString = concatQueryString(queryString, "Type", pageType);
    for (let i = 0; i < valuesLikeNamesComponents.length; i++) {
      if (valuesLikeNamesComponents[i].value !== valuesLikeNames[i]) {
        let initUpperCase =
          valuesLikeNames[i].charAt(0).toUpperCase() +
          valuesLikeNames[i].substring(1);
        filtersValues[initUpperCase] = valuesLikeNamesComponents[i].value;
        queryString = concatQueryString(
          queryString,
          `${initUpperCase}`,
          valuesLikeNamesComponents[i].value
        );
      }
    }
    if (roadSide.value !== "Side") {
      let roadSideValue = roadSide.value === "Left" ? "L" : "R";
      filtersValues.Side = roadSideValue;
      queryString = concatQueryString(queryString, "Side", roadSideValue);
    }
    for (let i = 0; i < valuesTrueFalseComponents.length; i++) {
      if (valuesTrueFalseComponents[i].checked) {
        filtersValues[valuesTrueFalse[i]] = "True";
        queryString = concatQueryString(
          queryString,
          `${valuesTrueFalse[i]}`,
          "True"
        );
      } else {
        filtersValues[valuesTrueFalse[i]] = "False";
        queryString = concatQueryString(
          queryString,
          `${valuesTrueFalse[i]}`,
          "False"
        );
      }
    }
    for (let i = 0; i < dateValuesComponents.length; i++) {
      if (dateValuesComponents[i].value !== "") {
        filtersValues[dateValues[i]] = dateValuesComponents[i].value;
        queryString = concatQueryString(
          queryString,
          `${dateValues[i]}`,
          dateValuesComponents[i].value.toString()
        );
      }
    }
    if (severity.value !== "0") {
      filtersValues.Severity = severity.value;
      queryString = concatQueryString(queryString, "Severity", severity.value);
    }
    for (let i = 0; i < valuesDayComponents.length; i++) {
      if (valuesDayComponents[i].checked) {
        filtersValues[valuesDayNight[i]] = "Day";
        queryString = concatQueryString(
          queryString,
          `${valuesDayNight[i]}`,
          "Day"
        );
      } else {
        if (valuesNightComponents[i].checked) {
          filtersValues[valuesDayNight[i]] = "Night";
          queryString = concatQueryString(
            queryString,
            `${valuesDayNight[i]}`,
            "Night"
          );
        }
      }
    }
    for (let i = 0; i < lowerValuesComponents.length; i++) {
      if (lowerValuesComponents[i].value !== "") {
        filtersValues[lowerValues[i]] = lowerValuesComponents[i].value;
        queryString = concatQueryString(
          queryString,
          `${lowerValues[i]}`,
          lowerValuesComponents[i].value
        );
      }
    }
    for (let i = 0; i < higherValuesComponents.length; i++) {
      if (higherValuesComponents[i].value !== "") {
        filtersValues[higherValues[i]] = higherValuesComponents[i].value;
        queryString = concatQueryString(
          queryString,
          `${higherValues[i]}`,
          higherValuesComponents[i].value
        );
      }
    }
    if (verifFilters(filtersValues) === true) {
      send_request(queryString.substring(1));
    }
  }

  function concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
  }

  function verifyWeatherFilters(filtersValues) {
    for (let i = 0; i < lowerValues.length; i++) {
      if (
        parseFloat(filtersValues[lowerValues[i]]) >
        parseFloat(filtersValues[higherValues[i]])
      ) {
        message.innerText = `The first value for ${weatherNames[i]} cannot be higher that the second value`;
        return false;
      }
    }
    return true;
  }

  function verifyDates(filtersValues) {
    if (filtersValues.Start_Date_1 > filtersValues.Start_Date_2) {
      message.innerText = "First date must be smaller than second date!";
      return false;
    } else {
      if (filtersValues.Start_Hour_1 > filtersValues.Start_Hour_2) {
        message.innerText = "First hour must be smaller than second hour!";
        return false;
      }
      return true;
    }
  }

  function verifyLocation(filtersValues) {
    const locations = [
      "State",
      "County",
      "City",
      "Street",
      "Number",
      "Timezone",
    ];
    for (let i = 0; i < locations.length; i++) {
      if (filtersValues[locations[i]]) {
        message.innerText =
          "WARNING: You can only see a Cartomap for the entire USA.";
        return false;
      }
    }
    return true;
  }

  function verifFilters(filtersValues) {
    const ok = verifyWeatherFilters(filtersValues);
    const okDate = verifyDates(filtersValues);
    const okLocation = verifyLocation(filtersValues);
    if (ok && okDate && okLocation) message.innerText = "";
    return ok && okDate;
  }

  function history(boudaries) {
    const low = document.querySelector("p.low");
    const medium = document.querySelector("p.medium");
    const medium1 = document.querySelector("p.medium1");
    const high = document.querySelector("p.high");
    if (boudaries) {
      low.innerText = boudaries.first[0] + "-" + Math.round(boudaries.first[1]);
      medium.innerText =
        Math.round(boudaries.second[0]) + "-" + Math.round(boudaries.second[1]);
      medium1.innerText =
        Math.round(boudaries.third[0]) + "-" + Math.round(boudaries.third[1]);
      high.innerText =
        Math.round(boudaries.fourth[0]) + "-" + Math.round(boudaries.fourth[1]);
    }
  }

  function open_map(content) {
    up();
    var pop = document.getElementById("states_pop");
    var map = document.getElementById("map");
    map.setAttribute("latitude", parseFloat(content.Start_Lat));
    map.getAttribute("longitude", parseFloat(content.Start_Lng));
    var left = pop.childNodes[0];
    var el = document.querySelectorAll("#states > #" + content.State)[0];
    pop.style.display = "flex";
    pop.style.top = window.scrollY + 140 + "px";
    left.innerHTML =
      '<div class = "pop_text"><p>' +
      dict_names[el.getAttribute("id")] +
      "</p>";
    if (el.hasAttribute("count"))
      left.innerHTML += "<p>" + el.getAttribute("count") + "</p></div>";
    left.innerHTML +=
      '<div class = "pop_img"><img src="' +
      dict_img[el.getAttribute("id")] +
      '"></div>';
    google.maps.event.addDomListener(window, "load", initMap());
  }

  function color_map(content, boudaries) {
    var levels = ["high_s", "medium_s", "medium1_s", "low_s"];
    up();
    var svgStates = document.querySelectorAll("#states > *");
    svgStates.forEach(function (el) {
      let state = content.find((obj) => obj._id === el.id);
      if (state === undefined) {
        let noResponse = {};
        noResponse._id = el.id;
        noResponse.count = 0;
        setAttributesPath(el, "#edeff1", levels[3]);
        el.setAttribute("count", 0);
      } else {
        el.setAttribute("count", state.count);
        if (state.count <= boudaries.first[1]) {
          setAttributesPath(el, "#edeff1", levels[3]);
        }
        if (
          state.count > boudaries.second[0] &&
          state.count <= boudaries.second[1]
        ) {
          setAttributesPath(el, "#899cb9", levels[2]);
        }
        if (
          state.count > boudaries.third[0] &&
          state.count <= boudaries.third[1]
        ) {
          setAttributesPath(el, "#174ea6", levels[1]);
        }
        if (state.count > boudaries.fourth[0]) {
          setAttributesPath(el, "#0f115c", levels[0]);
        }
      }
    });
  }

  function setAttributesPath(el, color, level) {
    el.style.fill = color;
    el.setAttribute("class", level);
  }
  const resetButton = document.getElementById("reset_button");
  resetButton.addEventListener("click", resetSelect);

  function resetSelect() {
    const selects = document.querySelectorAll("select");
    for (let select of selects) {
      select.selectedIndex = 0;
    }
  }
});
