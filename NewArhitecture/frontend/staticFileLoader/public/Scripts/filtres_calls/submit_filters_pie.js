document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";

  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? "flex" : "none";
  }

  function send_request(query) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      setVisible("#left_cont", false);
      setVisible("#loading", true);
      if (this.readyState === 4 && this.status === 200) {
        const { content } = JSON.parse(this.responseText);
        generatePie(content);
        setVisible("#loading", false);
        setVisible("#left_cont", true);
      }
    };
    url = api + query;
    console.log(url);
    xhttp.open(method, url, true);
    xhttp.send();
  }

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
  const resetFilters = document.getElementById("reset_button");
  const pieCriteria = document.getElementById("pie_criteria");
  const filtersForm = document.getElementById("filters_form");
  let message = document.getElementById("filter_message");
  let criterion;

  filtersForm.addEventListener("change", criterionForPie);
  resetFilters.addEventListener("click", function () {
    deletePieCriteriaNodes();
  });

  submitFilters.addEventListener("click", handlerSubmitFilters);

  function handlerSubmitFilters(e) {
    e.preventDefault();
    let filtersValues = {};
    let queryString = "";
    const pageTypeIndex = window.location.href.lastIndexOf("/");
    const pageType = window.location.href.substring(pageTypeIndex + 1);

    queryString = concatQueryString(queryString, "Type", pageType);
    if (state.value !== "state") {
      filtersValues.State = state.value;
      queryString = concatQueryString(queryString, "State", state.value);
    }
    if (county.value !== "county") {
      filtersValues.County = county.value;
      queryString = concatQueryString(queryString, "County", county.value);
    }
    if (city.value !== "city") {
      filtersValues.City = city.value;
      queryString = concatQueryString(queryString, "City", city.value);
    }
    if (street.value !== "street") {
      filtersValues.Street = street.value;
      queryString = concatQueryString(queryString, "Street", street.value);
    }
    if (number.value !== "number") {
      filtersValues.Number = number.value;
      queryString = concatQueryString(queryString, "Number", number.value);
    }
    if (timezone.value !== "timezone") {
      filtersValues.Timezone = timezone.value;
      queryString = concatQueryString(queryString, "Timezone", timezone.value);
    }
    if (roadSide.value !== "") {
      filtersValues.Side = roadSide.value === "Left" ? "L" : "R";
      let roadSideValue = roadSide.value === "Left" ? "L" : "R";
      queryString = concatQueryString(queryString, "Side", roadSideValue);
    }
    if (weather.value !== "") {
      filtersValues.Weather_Condition = weather.value;
      queryString = concatQueryString(
        queryString,
        "Weather_Condition",
        weather.value
      );
    }
    if (windDirection.value !== "") {
      filtersValues.Wind_Direction = windDirection.value;
      queryString = concatQueryString(
        queryString,
        "Wind_Direction",
        windDirection.value
      );
    }
    if (amenity.checked) {
      filtersValues.Amenity = "True";
      queryString = concatQueryString(queryString, "Amenity", "True");
    } else {
      filtersValues.Amenity = "False";
      queryString = concatQueryString(queryString, "Amenity", "False");
    }
    if (bump.checked) {
      filtersValues.Bump = "True";
      queryString = concatQueryString(queryString, "Bump", "True");
    } else {
      filtersValues.Bump = "False";
      queryString = concatQueryString(queryString, "Bump", "False");
    }
    if (crossing.checked) {
      filtersValues.Crossing = "True";
      queryString = concatQueryString(queryString, "Crossing", "True");
    } else {
      filtersValues.Crossing = "False";
      queryString = concatQueryString(queryString, "Crossing", "False");
    }
    if (giveWay.checked) {
      filtersValues.Give_Way = "True";
      queryString = concatQueryString(queryString, "Give_Way", "True");
    } else {
      filtersValues.Give_Way = "False";
      queryString = concatQueryString(queryString, "Give_Way", "False");
    }
    if (junction.checked) {
      filtersValues.Junction = "True";
      queryString = concatQueryString(queryString, "Junction", "True");
    } else {
      filtersValues.Junction = "False";
      queryString = concatQueryString(queryString, "Junction", "False");
    }
    if (noExit.checked) {
      filtersValues.No_Exit = "True";
      queryString = concatQueryString(queryString, "No_Exit", "True");
    } else {
      filtersValues.No_Exit = "False";
      queryString = concatQueryString(queryString, "No_Exit", "False");
    }
    if (railway.checked) {
      filtersValues.Railway = "True";
      queryString = concatQueryString(queryString, "Railway", "True");
    } else {
      filtersValues.Railway = "False";
      queryString = concatQueryString(queryString, "Railway", "False");
    }
    if (roundabout.checked) {
      filtersValues.Roundabout = "True";
      queryString = concatQueryString(queryString, "Roundabout", "True");
    } else {
      filtersValues.Roundabout = "False";
      queryString = concatQueryString(queryString, "Roundabout", "False");
    }
    if (trafficCalming.checked) {
      filtersValues.Traffic_Calming = "True";
      queryString = concatQueryString(queryString, "Traffic_Calming", "True");
    } else {
      filtersValues.Traffic_Calming = "False";
      queryString = concatQueryString(queryString, "Traffic_Calming", "False");
    }
    if (stop.checked) {
      filtersValues.Stop = "True";
      queryString = concatQueryString(queryString, "Stop", "True");
    } else {
      filtersValues.Stop = "False";
      queryString = concatQueryString(queryString, "Stop", "False");
    }
    if (station.checked) {
      filtersValues.Station = "True";
      queryString = concatQueryString(queryString, "Station", "True");
    } else {
      filtersValues.Station = "False";
      queryString = concatQueryString(queryString, "Station", "False");
    }
    if (trafficSignal.checked) {
      filtersValues.Traffic_Signal = "True";
      queryString = concatQueryString(queryString, "Traffic_Signal", "True");
    } else {
      filtersValues.Traffic_Signal = "False";
      queryString = concatQueryString(queryString, "Traffic_Signal", "False");
    }
    if (accidentDateStart.value !== "") {
      filtersValues.Start_Date_1 = accidentDateStart.value.toString();
      queryString = concatQueryString(
        queryString,
        "FirstDate",
        accidentDateStart.value.toString()
      );
    }
    if (accidentDateEnd.value !== "") {
      filtersValues.Start_Date_2 = accidentDateEnd.value.toString();
      queryString = concatQueryString(
        queryString,
        "SecondDate",
        accidentDateEnd.value.toString()
      );
    }
    if (accidentHourStart.value !== "") {
      filtersValues.Start_Hour_1 = accidentHourStart.value.toString();
      queryString = concatQueryString(
        queryString,
        "FirstHour",
        accidentHourStart.value.toString()
      );
    }
    if (accidentHourEnd.value !== "") {
      filtersValues.Start_Hour_2 = accidentHourEnd.value.toString();
      queryString = concatQueryString(
        queryString,
        "SecondHour",
        accidentHourEnd.value.toString()
      );
    }
    if (severity.value !== "0") {
      filtersValues.Severity = severity.value;
      queryString = concatQueryString(
        queryString,
        "Severity",
        severity.value.toString()
      );
    }
    if (sunriseSunsetDay.checked) {
      filtersValues.Sunrise_Sunset = "Day";
      queryString = concatQueryString(queryString, "Sunrise_Sunset", "Day");
    }
    if (sunriseSunsetNight.checked) {
      filtersValues.Sunrise_Sunset = "Night";
      queryString = concatQueryString(queryString, "Sunrise_Sunset", "Night");
    }
    if (civilTwilightDay.checked) {
      filtersValues.Civil_Twilight = "Day";
      queryString = concatQueryString(queryString, "Civil_Twilight", "Day");
    }
    if (civilTwilightNight.checked) {
      filtersValues.Civil_Twilight = "Night";
      queryString = concatQueryString(queryString, "Civil_Twilight", "Night");
    }
    if (nauticalTwilightDay.checked) {
      filtersValues.Nautical_Twilight = "Day";
      queryString = concatQueryString(queryString, "Nautical_Twilight", "Day");
    }
    if (nauticalTwilightNight.checked) {
      filtersValues.Nautical_Twilight = "Night";
      queryString = concatQueryString(
        queryString,
        "Nautical_Twilight",
        "Night"
      );
    }
    if (astronomicalTwilightDay.checked) {
      filtersValues.Astronomical_Twilight = "Day";
      queryString = concatQueryString(
        queryString,
        "Astronomical_Twilight",
        "Day"
      );
    }
    if (astronomicalTwilightNight.checked) {
      filtersValues.Astronomical_Twilight = "Night";
      queryString = concatQueryString(
        queryString,
        "Astronomical_Twilight",
        "Night"
      );
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

    filtersValues.Pie_Criterion = editCriterion(pieCriteria.value);
    criterion = filtersValues.Pie_Criterion;
    queryString = concatQueryString(
      queryString,
      "Pie_Criterion",
      criterion
    );

    if (verifFilters(filtersValues) === true) {
      send_request(queryString.substring(1));
    }
  }

  function concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
  }

  function deletePieCriteriaNodes() {
    while (pieCriteria.firstChild && pieCriteria.childElementCount > 1) {
      pieCriteria.removeChild(pieCriteria.lastChild);
    }
  }

  function createCriterionFields() {
    let options = [];
    if (state.value === "state") {
      options.push("State");
    }
    if (county.value === "county") {
      options.push("County");
    }
    if (city.value === "city") {
      options.push("City");
    }
    if (street.value === "street") {
      options.push("Street");
    }
    if (number.value === "number") {
      options.push("Number");
    }
    if (timezone.value === "timezone") {
      options.push("Timezone");
    }
    if (roadSide.value === "") {
      options.push("Road side");
    }
    if (weather.value === "") {
      options.push("Weather");
    }
    if (windDirection.value === "") {
      options.push("Wind direction");
    }
    if (temperature1.value === "" && temperature2.value === "") {
      options.push("Temperature");
    }
    if (windChill1.value === "" && windChill2.value === "") {
      options.push("Wind chill");
    }
    if (windSpeed1.value === "" && windSpeed2.value === "") {
      options.push("Wind speed");
    }
    if (humidity1.value === "" && humidity2.value === "") {
      options.push("Humidity");
    }
    if (pressure1.value === "" && pressure2.value === "") {
      options.push("Pressure");
    }
    if (visibility1.value === "" && visibility2.value === "") {
      options.push("Visibility");
    }
    if (precipitation1.value === "" && precipitation2.value === "") {
      options.push("Precipitation");
    }
    if (accidentDateStart.value === "" && accidentDateEnd.value === "") {
      options.push("Accident date");
    }
    if (severity.value === "0") {
      options.push("Severity");
    }
    if (accidentHourStart.value === "" && accidentHourEnd.value === "") {
      options.push("Hour");
    }
    if (
      sunriseSunsetDay.checked === false &&
      sunriseSunsetNight.checked === false
    ) {
      options.push("Sunrise/Sunset");
    }
    if (
      civilTwilightDay.checked === false &&
      civilTwilightNight.checked === false
    ) {
      options.push("Civil twilight");
    }
    if (
      nauticalTwilightDay.checked === false &&
      nauticalTwilightNight.checked === false
    ) {
      options.push("Nautical twilight");
    }
    if (
      astronomicalTwilightDay.checked === false &&
      astronomicalTwilightNight.checked === false
    ) {
      options.push("Astronomical twilight");
    }
    return options;
  }

  function createCriterionOptions(options) {
    for (i = 0; i < options.length; i++) {
      let option = document.createElement("option");
      let opt = options[i];
      option.value = opt;
      option.textContent = opt;
      pieCriteria.appendChild(option);
    }
  }

  function criterionForPie(e) {
    deletePieCriteriaNodes();
    let options = createCriterionFields();
    createCriterionOptions(options);
  }

  function verifyWeatherFiltres(filtersValues) {
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

  function verifyExistCriterion(filtersValues) {
    if (filtersValues.Pie_Criterion === "criterion") {
      message.innerText = "You have to select a criterion!";
      return false;
    }
    return true;
  }

  function verifFilters(filtersValues) {
    let filtersValueLength = Object.keys(filtersValues).length;
    if (
      filtersValueLength === 13 &&
      filtersValues.Amenity === "False" &&
      filtersValues.Bump === "False" &&
      filtersValues.Crossing === "False" &&
      filtersValues.Give_Way === "False" &&
      filtersValues.Junction === "False" &&
      filtersValues.No_Exit === "False" &&
      filtersValues.Railway === "False" &&
      filtersValues.Roundabout === "False" &&
      filtersValues.Traffic_Calming === "False" &&
      filtersValues.Stop === "False" &&
      filtersValues.Station === "False" &&
      filtersValues.Traffic_Signal === "False" &&
      filtersValues.Pie_Criterion === "criterion"
    ) {
      message.innerText = "You have to select at least one filter!";
      return false;
    }
    const ok = verifyWeatherFiltres(filtersValues);
    const okDate = verifyDates(filtersValues);
    const okCriterion = verifyExistCriterion(filtersValues);
    if (ok && okDate && okCriterion) message.innerText = "";
    return ok && okDate && okCriterion;
  }

  function editCriterion(criterion) {
    switch (criterion) {
      case "Road side":
        return "Side";
      case "Weather":
        return "Weather_Condition";
      case "Wind direction":
        return "Wind_Direction";
      case "Temperature":
        return "Temperature(F)";
      case "Wind chill":
        return "Wind_Chill(F)";
      case "Wind speed":
        return "Wind_Speed(mph)";
      case "Humidity":
        return "Humidity(%)";
      case "Pressure":
        return "Pressure(in)";
      case "Visibility":
        return "Visibility(mi)";
      case "Precipitation":
        return "Precipitation(in)";
      case "Accident date":
        return "Start_Date";
      case "Hour":
        return "Start_Hour";
      case "Sunrise/Sunset":
        return "Sunrise_Sunset";
      case "Civil twilight":
        return "Civil_Twilight";
      case "Nautical twilight":
        return "Nautical_Twilight";
      case "Astronomical twilight":
        return "Astronomical_Twilight";
      default:
        return criterion;
    }
  }

  function deletePieLegend() {
    let legendPie = document.querySelector(".legend_pie");
    while (legendPie.firstChild) {
      legendPie.removeChild(legendPie.lastChild);
    }
  }

  function errorMessage() {
    let errorMessageResult = document.getElementById("error_message_result");
    errorMessageResult.innerText = "NO DATA FOUND!";
  }

  function deleteErrorMessage() {
    let errorMessageResult = document.getElementById("error_message_result");
    errorMessageResult.innerText = "";
  }

  function generatePieLegend(dataProcents, data, info) {
    deleteErrorMessage();

    let legendAfter = d3.select(".legend_pie");
    legendAfter
      .selectAll(".legend_content")
      .data(dataProcents)
      .enter()
      .append("div")
      .attr("class", "legend_content");

    let legend_contentAfter = d3.selectAll(".legend_content");
    legend_contentAfter.append("div").attr("class", "legend_color");
    legend_contentAfter.append("div").attr("class", "legend_info");

    let legend_colorAfter = d3.selectAll(".legend_color");
    legend_colorAfter
      .data(dataProcents)
      .style("background-color", function (d, i) {
        return colorAfter(i);
      });

    let legend_infoAfter = d3.selectAll(".legend_info");
    legend_infoAfter
      .data(data)
      .append("text")
      .text(function (d, i) {
        let number = data[i];
        let text = info[i];
        return criterion + " " + text + ": " + number + " accidents";
      });
  }

  function drawPie(dataProcents) {
    let svgAfter = d3.select("#svg_pie"),
      widthAfter = svgAfter.attr("width"),
      heightAfter = svgAfter.attr("height"),
      radiusAfter = Math.min(widthAfter, heightAfter) / 2,
      gAfter = svgAfter
        .append("g")
        .attr(
          "transform",
          "translate(" + widthAfter / 2 + "," + heightAfter / 2 + ")"
        );

    let pieAfter = d3.pie();

    let pathAfter = d3
      .arc()
      .outerRadius(radiusAfter - 10)
      .innerRadius(0);

    let arcsAfter = gAfter
      .selectAll(".arc")
      .data(pieAfter(dataProcents))
      .enter()
      .append("g")
      .attr("class", "arc");

    arcsAfter
      .append("path")
      .attr("d", pathAfter)
      .attr("fill", function (d, i) {
        return colorAfter(i);
      })
      .append("title")
      .text(function (d, i) {
        return dataProcents[i] + "%";
      });
  }

  function generatePie(dataResponse) {
    dataResponse.sort(function (a, b) {
      return a.count - b.count;
    });
    console.log(dataResponse);
    let data = [];
    let info = [];

    if (Object.keys(dataResponse).length === 0) {
      data = [100];
      errorMessage();
    }

    for (let i = 0; i < dataResponse.length; i++) {
      if (dataResponse[i]._id) {
        data.push(dataResponse[i].count);
        info.push(dataResponse[i]._id);
      }
    }

    let total = 0;
    data.map((number) => (total += number));

    let dataProcents = [];
    data.map((number) => dataProcents.push((number * 100) / total));

    drawPie(dataProcents);
    deletePieLegend();

    if (Object.keys(dataResponse).length !== 0) {
      generatePieLegend(dataProcents, data, info);
    }
  }

  const colorAfter = d3.scaleOrdinal([
    "#394690",
    "#b85137",
    "#ff7f00",
    "#984ea3",
    "#e41a1c",
    "#7CA39D",
    "#FF253E",
    "#1FB8A3",
    "#b5b865",
    "#3baf41",
    "#DEB887",
    "#7FFF00",
    "#A9A9A9",
    "#006400",
    "#8B008B",
    "#8FBC8F",
    "#F08080",
    "#3CB371",
    "#EE82EE",
    "#FFFF00",
    "#FA8072",
    "#8B4513",
    "#BC8F8F",
    "#CD853F",
    "#000080",
    "#48D1CC",
  ]);
});
