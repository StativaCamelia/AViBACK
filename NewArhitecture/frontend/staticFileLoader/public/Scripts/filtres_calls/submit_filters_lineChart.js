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
  let message = document.getElementById("filter_message");

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
    let filtersValueLength = Object.keys(filtersValues).length;
    if (
      filtersValueLength === 12 &&
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
      filtersValues.Traffic_Signal === "False"
    ) {
      message.innerText = "You have to select at least one filter!";
      return false;
    }
    const ok = verifyWeatherFiltres(filtersValues);
    const okDate = verifyDates(filtersValues);
    console.log(verifyWeatherFiltres(filtersValues));
    if (ok && okDate) message.innerText = "";
    return ok && okDate;
  }
});
