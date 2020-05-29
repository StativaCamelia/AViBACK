document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";

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
  const valuesDayNight = ["Sunrise_Sunset", "Civil_Twilight", "Nautical_Twilight", "Astronomical_Twilight"];

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

  submitFilters.addEventListener("click", handlerSubmitFilters);

  function handlerSubmitFilters(e) {
    e.preventDefault();
    let filtersValues = {};
    let queryString = "";
    const pageTypeIndex = window.location.href.lastIndexOf("/");
    const pageType = window.location.href.substring(pageTypeIndex + 1);

    queryString = concatQueryString(queryString, "Type", pageType);
    for (let i = 0; i < valuesLikeNamesComponents.length; i++) {
      if (valuesLikeNamesComponents[i].value !== valuesLikeNames[i]) {
        let initUpperCase = valuesLikeNames[i].charAt(0).toUpperCase() + valuesLikeNames[i].substring(1);
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
      queryString = concatQueryString(
          queryString,
          "Severity",
          severity.value.toString()
      );
    }
    for(let i = 0; i < valuesDayComponents.length; i++){
      if(valuesDayComponents[i].checked){
        filtersValues[valuesDayNight[i]] = "Day";
        queryString = concatQueryString(queryString,`${valuesDayNight[i]}`,"Day");
      }else{
        if(valuesNightComponents[i].checked){
          filtersValues[valuesDayNight[i]] = "Night";
          queryString = concatQueryString(queryString,`${valuesDayNight[i]}`,"Night");
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
    console.log(queryString)
    if (verifFilters(filtersValues) === true) {
      send_request(queryString.substring(1));
    }
  }

  function concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
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

  function verifFilters(filtersValues) {
    const ok = verifyWeatherFiltres(filtersValues);
    const okDate = verifyDates(filtersValues);
    console.log(verifyWeatherFiltres(filtersValues));
    if (ok && okDate) message.innerText = "";
    return ok && okDate;
  }
});
