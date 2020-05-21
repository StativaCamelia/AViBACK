document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";

  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? "flex" : "none";
  }

  function send_request(query) {
    var xhttp = new XMLHttpRequest();
    console.log(query);
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

  let filtersValues = {};
  filtersValues.State = [];
  submitFilters.addEventListener("click", handlerSubmitFilters);

  const addFiltres = document.getElementById("next_button");
  addFiltres.addEventListener("click", handlerAddFiltres);

  const datasets = [];
  let numberOfDatasets = 0;

  function collectData() {
    let dataset = {};
    let dataString = "";
    const filtersComponents = [
      state,
      county,
      city,
      street,
      number,
      timezone,
      roadSide,
      weather,
      windDirection,
      severity,
    ];
    const defaultValues = [
      "state",
      "county",
      "city",
      "street",
      "number",
      "timezone",
      "",
      "",
      "",
      "0",
    ];
    const filterDatabase = [
      "State",
      "County",
      "City",
      "Street",
      "Number",
      "Timezone",
      "Side",
      "Weather_Condition",
      "Wind_Direction",
      "Severity",
    ];
    for (let i = 0; i < filtersComponents.length; i++) {
      if (filtersComponents[i].value !== defaultValues[i]) {
        if (filtersComponents[i] === roadSide) {
          dataset[filterDatabase[i]] = "Left" ? "L" : "R";
        } else {
          dataset[filterDatabase[i]] = filtersComponents[i].value;
        }
        dataString = concatQueryString(
          dataString,
          filterDatabase[i],
          dataset[filterDatabase[i]]
        );
      }
    }
    const roadConditions = [
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
    const roadConditionDatabase = [
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
    for (let i = 0; i < roadConditions.length; i++) {
      roadConditions[i].checked
        ? (dataset[roadConditionDatabase[i]] = "True")
        : (dataset[roadConditionDatabase[i]] = "False");
      dataString = concatQueryString(
        dataString,
        roadConditionDatabase[i],
        dataset[roadConditionDatabase[i]]
      );
    }

    for (let i = 0; i < lowerValuesComponents.length; i++) {
      if (lowerValuesComponents[i].value !== "") {
        dataset[lowerValues[i]] = lowerValuesComponents[i].value;
        dataString = concatQueryString(
          dataString,
          `${lowerValues[i]}`,
          lowerValuesComponents[i].value
        );
      }
    }
    for (let i = 0; i < higherValuesComponents.length; i++) {
      if (higherValuesComponents[i].value !== "") {
        dataset[higherValues[i]] = higherValuesComponents[i].value;
        dataString = concatQueryString(
          dataString,
          `${higherValues[i]}`,
          higherValuesComponents[i].value
        );
      }
    }

    const datesComponents = [
      accidentDateStart,
      accidentDateEnd,
      accidentHourStart,
      accidentHourEnd,
    ];
    const datesFields = [
      "Start_Date_1",
      "Start_Date_2",
      "Start_Hour_1",
      "Start_Hour_2",
    ];
    const databaseComponents = [
      "FirstDate",
      "SecondDate",
      "FirstHour",
      "SecondHour",
    ];
    for (let i = 0; i < databaseComponents.length; i++) {
      if (datesComponents[i].value !== "") {
        dataset[datesFields[i]] = datesComponents[i].value.toString();
        dataString = concatQueryString(
          dataString,
          databaseComponents[i],
          dataset[datesFields[i]].toString()
        );
      }
    }

    const astronomicComponents = [
      sunriseSunsetDay,
      sunriseSunsetNight,
      civilTwilightDay,
      civilTwilightNight,
      nauticalTwilightDay,
      nauticalTwilightNight,
      astronomicalTwilightDay,
      astronomicalTwilightNight,
    ];
    const astronomicDatabase = [
      "Sunrise_Sunset",
      "Sunrise_Sunset",
      "Civil_Twilight",
      "Civil_Twilight",
      "Nautical_Twilight",
      "Nautical_Twilight",
      "Astronomical_Twilight",
      "Astronomical_Twilight",
    ];
    const astronomicValues = [
      "Day",
      "Night",
      "Day",
      "Night",
      "Day",
      "Night",
      "Day",
      "Night",
    ];
    for (let i = 0; i < astronomicComponents.length; i++) {
      if (astronomicComponents[i].checked) {
        dataset[astronomicDatabase[i]] = astronomicValues[i];
        dataString = concatQueryString(
          dataString,
          astronomicDatabase[i],
          astronomicValues[i]
        );
      }
    }
    dataString = dataString.substring(1);
    return { dataset, dataString };
  }

  function handlerAddFiltres(e) {
    e.preventDefault();
    numberOfDatasets++;
    const { dataString, dataset } = collectData();
    if (verifFilters(dataset) === true) {
      datasets.push({ data: dataString });
    }
    document.getElementById("filters_form").reset();
  }

  function handlerSubmitFilters(e) {
    e.preventDefault();
    const pageTypeIndex = window.location.href.lastIndexOf("/");
    const pageType = window.location.href.substring(pageTypeIndex + 1);
    let queryString = "";
    queryString = concatQueryString(queryString, "Type", pageType);
    if (numberOfDatasets === 0) {
      let { dataString, dataset } = collectData();
      if (verifFilters(dataset) === true) {
        queryString += dataString;
        console.log(queryString);
        send_request(queryString);
      }
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
    if (ok && okDate) message.innerText = "";
    return ok && okDate;
  }
});
