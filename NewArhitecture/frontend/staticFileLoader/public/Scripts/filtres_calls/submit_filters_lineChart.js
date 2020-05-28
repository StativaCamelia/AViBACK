document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";

  let datasetsSend = [];
  let datasetsReceived = [];
  let continueGraph = "Submit";
  let groupByCriterion;
  var lineChart;

  function createLineChart(content) {
    var canvas = document.getElementById("line_chart");
    var ctx = canvas.getContext("2d");
    Chart.defaults.global.defaultFontSize = 12;
    if (lineChart != undefined) lineChart.destroy();

    function getRandomColor() {
      var letters = "0123456789ABCDEF";
      var color = "#";
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }

    function getDatasetFromAnswer(data, numberOfDataset) {
      let dataset = [];
      let dataChart;
      let labels = [];
      for (let i = 0; i < data.length; i++) {
        dataset.push(data[i].count);
        if (!data[i]._id.day) {
          labels.push(data[i]._id);
        } else {
          labels.push("Day:" + data[i]._id.day + " Hour:" + data[i]._id.hour);
        }
      }
      dataChart = {
        data: dataset,
        label: "Dataset " + (numberOfDataset + 1),
        borderColor: getRandomColor(),
        fill: false,
      };
      return { labels: labels, data: dataChart };
    }

    if (content !== []) {
      datasetsReceived.push(content);
      let allDatasets = [];
      let dateLabels = [];
      for (let j = 0; j < datasetsReceived.length; j++) {
        let { labels, data } = getDatasetFromAnswer(datasetsReceived[j], j);
        if (j === 0) dateLabels = labels;
        allDatasets.push(data);
      }
      var data = {
        labels: dateLabels,
        datasets: allDatasets,
      };
      lineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          title: {
            display: true,
          },
          legend: {
            fontSize: 10,
            fontFamily: "tamoha",
            fontColor: "Sienna",
          },
        },
      });
    } else {
      var data = {
        labels: [2016, 2017, 2018, 2019],
        datasets: [],
      };
      lineChart = new Chart(ctx, {
        type: "line",
        data: data,
        options: {
          title: {
            display: true,
            text: "No data was found ",
          },
          legend: {
            fontSize: 10,
            fontFamily: "tamoha",
            fontColor: "Sienna",
          },
        },
      });
    }
    if (continueGraph === "Submit") {
      datasetsReceived = [];
      datasetsSend = [];
      let time_interval = document.querySelector(".time_filtres");
      time_interval.style.display = "flex";
    }
  }

  function setVisible(selector, visible) {
    document.querySelector(selector).style.display = visible ? "flex" : "none";
  }

  function up() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  const resetButton = document.getElementById("reset_button");
  resetButton.addEventListener("click", resetSelect);
  function resetSelect() {
    const selects = document.querySelectorAll("select");
    for (let select of selects) {
      select.selectedIndex = 0;
    }
  }

  function send_request(query) {
    var xhttp = new XMLHttpRequest();
    up();
    filtersForm.reset();
    resetSelect();
    xhttp.onreadystatechange = function () {
      setVisible("#left_cont", false);
      setVisible("#loading", true);
      if (this.readyState === 4 && this.status === 200) {
        const { content } = JSON.parse(this.responseText);
        setVisible("#loading", false);
        setVisible("#left_cont", true);
        createLineChart(content);
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
  const lowerValuesWeather = [
    "Temperature1",
    "Wind_Chill1",
    "Wind_Speed1",
    "Pressure1",
    "Precipitation1",
    "Humidity1",
    "Visibility1",
  ];
  const higherValuesWeather = [
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
  const lowerWeatherComponents = [
    temperature1,
    windChill1,
    windSpeed1,
    pressure1,
    precipitation1,
    humidity1,
    visibility1,
  ];
  const higherWeatherComponents = [
    temperature2,
    windChill2,
    windSpeed2,
    pressure2,
    precipitation2,
    humidity2,
    visibility2,
  ];

  const locationComponents = [
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
  const defaultValuesLocation = [
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
  const locationDatabase = [
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

  const roadComponents = [
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

  const submitFilters = document.getElementById("submit_button");
  let message = document.getElementById("filter_message");
  let filtersValues = {};
  submitFilters.addEventListener("click", handlerSubmitFilters);
  const addFiltres = document.getElementById("next_button");
  addFiltres.addEventListener("click", handlerAddFiltres);
  const groupBy = document.getElementById("intervalType");

  function collectData() {
    let dataset = {};
    let dataString = "";
    for (let i = 0; i < locationComponents.length; i++) {
      if (locationComponents[i].value !== defaultValuesLocation[i]) {
        if (locationComponents[i] === roadSide) {
          dataset[locationDatabase[i]] = "Left" ? "L" : "R";
        } else {
          dataset[locationDatabase[i]] = locationComponents[i].value;
        }
        if (locationComponents[i] === severity) {
          dataset[locationDatabase[i]] ===
            parseInt(locationComponents[i].value);
        }
        dataString = concatQueryString(
          dataString,
          locationDatabase[i],
          dataset[locationDatabase[i]]
        );
      }
    }

    for (let i = 0; i < roadComponents.length; i++) {
      roadComponents[i].checked
        ? (dataset[roadConditionDatabase[i]] = "True")
        : (dataset[roadConditionDatabase[i]] = "False");
      dataString = concatQueryString(
        dataString,
        roadConditionDatabase[i],
        dataset[roadConditionDatabase[i]]
      );
    }

    for (let i = 0; i < lowerWeatherComponents.length; i++) {
      if (lowerWeatherComponents[i].value !== "") {
        dataset[lowerValuesWeather[i]] = lowerWeatherComponents[i].value;
        dataString = concatQueryString(
          dataString,
          `${lowerValuesWeather[i]}`,
          lowerWeatherComponents[i].value
        );
      }
    }
    for (let i = 0; i < higherWeatherComponents.length; i++) {
      if (higherWeatherComponents[i].value !== "") {
        dataset[higherValuesWeather[i]] = higherWeatherComponents[i].value;
        dataString = concatQueryString(
          dataString,
          `${higherValuesWeather[i]}`,
          higherWeatherComponents[i].value
        );
      }
    }
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
    return { dataset, dataString };
  }

  //Preparare Date query String
  function prepareQueryString(type = "Submit") {
    const pageTypeIndex = window.location.href.lastIndexOf("/");
    const pageType = window.location.href.substring(pageTypeIndex + 1);
    let queryString = "";
    queryString = concatQueryString(queryString, "Type", pageType);
    let { dataString, dataset } = collectData();
    if (datasetsSend.length > 0) {
      dataset.Start_Date_1 = datasetsSend[0].Start_Date_1;
      if (dataset.Start_Date_1 !== undefined)
        queryString += concatQueryString("", "FirstDate", dataset.Start_Date_1);
      dataset.Start_Date_2 = datasetsSend[0].Start_Date_2;
      if (dataset.Start_Date_2 !== undefined)
        queryString += concatQueryString(
          "",
          "SecondDate",
          dataset.Start_Date_2
        );
      dataset.Start_Hour_1 = datasetsSend[0].Start_Hour_1;
      if (dataset.Start_Hour_1 !== undefined)
        queryString += concatQueryString("", "FirstHour", dataset.Start_Hour_1);
      dataset.Start_Hour_2 = datasetsSend[0].Start_Hour_2;
      if (dataset.Start_Hour_2 !== undefined)
        queryString += concatQueryString(
          "",
          "SecondHour",
          dataset.Start_Hour_2
        );
    }
    if (
      verifFilters(dataset) === true &&
      verifyIntervalExists(dataset) === true &&
      verifyGroupBy() === true
    ) {
      if (datasetsSend.length === 0) {
        groupByCriterion = groupBy.value;
        queryString += concatQueryString(
          "",
          "Line_Criterion",
          groupByCriterion
        );
      } else {
        queryString += concatQueryString(
          "",
          "Line_Criterion",
          groupByCriterion
        );
      }
      datasetsSend.push(dataset);
      queryString += dataString;
      let time_interval = document.querySelector(".time_filtres");
      let change_interval = document.getElementById("change_button");
      if (type === "Add") {
        time_interval.style.display = "none";
        change_interval.style.display = "block";
      }
      send_request(queryString.substring(1));
    }
  }

  function addDatasetToSelect() {
    let datasetsSelect = document.getElementById("list_datasets");
    let option = document.createElement("option");
    option.value = datasetsSend.length;
    option.innerHTML = "Dataset" + datasetsSend.length;
    datasetsSelect.appendChild(option);
  }

  function setDatasetTitle(index) {
    let title = document.querySelector("#filters_form>h2");
    title.innerHTML = "Dataset:" + (index + 1);
  }

  function handlerAddFiltres(e) {
    e.preventDefault();
    continueGraph = "Add";
    setDatasetTitle(datasetsSend.length + 1);
    prepareQueryString("Add");
    addDatasetToSelect(datasetsSend.length + 1);
  }

  function handlerSubmitFilters(e) {
    e.preventDefault();
    prepareQueryString("Submit");
    continueGraph = "Submit";
  }

  function concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
  }

  // FRONTEND CHECK
  function verifyIntervalExists(dataset) {
    const existsFiltres =
      dataset.Start_Date_1 != undefined ||
      dataset.Start_Date_2 != undefined ||
      dataset.Start_Hour_1 != undefined ||
      dataset.Start_Hour_2 != undefined;
    existsFiltres
      ? (message.innerHTML = "")
      : (message.innerHTML = "You shoul select a time interval");
    return existsFiltres;
  }

  function verifyGroupBy() {
    if (groupBy.value === "" && datasetsSend.length === 0) {
      message.innerHTML =
        "You should select a group by value for your interval";
    } else message.innerHTML = "";
    return groupBy.value === "" && datasetsSend.length === 0 ? false : true;
  }

  function verifyWeatherFiltres(filtersValues) {
    for (let i = 0; i < lowerValuesWeather.length; i++) {
      if (
        parseFloat(filtersValues[lowerValuesWeather[i]]) >
        parseFloat(filtersValues[higherValuesWeather[i]])
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

  function existsDate(filtersValues) {
    let numberOfValues = 0;
    let existsFiltres = false;
    const dates = [
      "Start_Date_1",
      "Start_Date_2",
      "Start_Hour_1",
      "Start_Hour_2",
    ];
    for (let i = 0; i < dates.length; i++) {
      if (filtersValues[dates[i]] !== undefined) numberOfValues++;
      existsFiltres = existsFiltres || filtersValues[dates[i]] !== undefined;
    }
    return { number: numberOfValues, exists: existsFiltres };
  }

  function verifFilters(filtersValues) {
    let filtersValueLength = Object.keys(filtersValues).length;
    if (
      filtersValueLength - existsDate(filtersValues).number == 12 &&
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
      existsDate(filtersValues).exists &&
      existsDate(filtersValues).number >= 1
    ) {
      message.innerText = "You have to select at least one filter!";
      return false;
    }
    const ok = verifyWeatherFiltres(filtersValues);
    const okDate = verifyDates(filtersValues);
    if (ok && okDate) message.innerText = "";
    return ok && okDate;
  }

  //Generarea Campului de Group By
  const filtersForm = document.getElementById("filters_form");
  filtersForm.addEventListener("change", addGroupByOptions);

  function getNumberOfYears(year1, year2) {
    const boundsYears = [2016, 2019];
    if (year1 && !year2) {
      return boundsYears[1] - year1;
    } else if (!year1 && year2) {
      return year2 - boundsYears[0];
    } else if (year1 && year2) {
      return year2 - year1;
    }
  }

  function getNumberOfMonths(numberOfYears, month1, month2) {
    let months;
    months = numberOfYears * 12;
    if (month1 && !month2) {
      return 12 - month1 + 12 * numberOfYears;
    } else if (month2 && !month1) {
      return month2 - 1 + 12 * numberOfYears;
    } else if (month1 && month2) {
      return month2 - month1 + 12 * numberOfYears;
    }
    return months;
  }

  function getNumberOfDays(month1, month2, day1, day2) {
    if (month1 && !month2) {
      return 31 - day1;
    } else if (!month1 && month2) {
      return day2 - 1;
    } else if (month1 && month2) {
      if (month2 - month1 === 1) {
        return 31 - day1 + day2;
      } else return day2 - day1;
    }
  }

  function getNumberOfHours(numberOfDays, hour1, hour2) {
    if (numberOfDays) {
      if (numberOfDays)
        return numberOfDays === 0 ? hour2 - hour1 : 24 - hour1 + hour2;
    } else {
      return hour2 - hour1;
    }
  }

  function verifyDateGroup(dates) {
    const numberOfYears = getNumberOfYears(dates.year1, dates.year2);
    const numberOfMonths = getNumberOfMonths(
      numberOfYears,
      dates.month1,
      dates.month2
    );
    let numberOfDays;
    if (numberOfMonths <= 1) {
      numberOfDays = getNumberOfDays(
        dates.month1,
        dates.month2,
        dates.day1,
        dates.day2
      );
    }
    let numberOfHours;
    if ((numberOfDays && numberOfDays <= 1) || dates.hour1 || dates.hour2) {
      numberOfHours = getNumberOfHours(numberOfDays, dates.hour1, dates.hour2);
    }
    if (numberOfDays > 1) {
      numberOfHours = null;
    }
    const intervals = ["Years", "Months", "Days", "Hours"];
    const numbers = [
      numberOfYears,
      numberOfMonths,
      numberOfDays,
      numberOfHours,
    ];
    for (let i = 0; i < numbers.length; i++) {
      if (numbers[i] > 0 && document.getElementById(intervals[i]) === null) {
        let option = document.createElement("option");
        option.value = intervals[i];
        option.textContent = intervals[i];
        option.id = intervals[i];
        groupBy.appendChild(option);
      } else if (!numbers[i]) {
        let element = document.getElementById(intervals[i]);
        if (element !== null) groupBy.removeChild(element);
      }
    }
  }

  function addGroupByOptions() {
    const { dataset, dataString } = collectData();
    let year1, year2, month1, month2, day1, day2, hour1, hour2;
    if (
      dataset.Start_Date_1 ||
      dataset.Start_Date_2 ||
      dataset.Start_Hour_1 ||
      dataset.Start_Hour_2
    ) {
      if (dataset.Start_Date_1) {
        year1 = parseInt(dataset.Start_Date_1.substring(0, 4));
        month1 = parseInt(dataset.Start_Date_1.substring(5, 7));
        day1 = parseInt(dataset.Start_Date_1.substring(8, 10));
      }
      if (dataset.Start_Date_2) {
        year2 = parseInt(dataset.Start_Date_2.substring(0, 4));
        month2 = parseInt(dataset.Start_Date_2.substring(5, 7));
        day2 = parseInt(dataset.Start_Date_2.substring(8, 10));
      }
      if (dataset.Start_Hour_1) {
        hour1 = parseInt(dataset.Start_Hour_1);
      }
      if (dataset.Start_Hour_2) {
        hour2 = parseInt(dataset.Start_Hour_2);
      }
    }
    verifyDateGroup({ year1, year2, month1, month2, day1, day2, hour1, hour2 });
  }

  const update_button = document.getElementById("update_button");
  const datasets_select = document.getElementById("list_datasets");
  datasets_select.addEventListener("change", goToDataset);

  function goToDataset() {
    let index = parseInt(datasets_select.value) - 1;
    let data = datasetsSend[index];
    setDatasetTitle(index);
    for (let field in data) {
      if (locationDatabase.indexOf(field) !== -1) {
        if (field === "Side") {
          data[field] === "L"
            ? (data[field] = "Left")
            : (data[field] = "Right");
        }
        locationComponents[locationDatabase.indexOf(field)].value = data[field];
      }
      if (roadConditionDatabase.indexOf(field) !== -1) {
        data[field] === "True"
          ? (roadComponents[
              roadConditionDatabase.indexOf(field)
            ].checked = true)
          : (roadComponents[
              roadConditionDatabase.indexOf(field)
            ].checked = false);
      }
      if (lowerValuesWeather.indexOf(field) !== -1) {
        lowerWeatherComponents[lowerValuesWeather.indexOf(field)].value =
          data[field];
      }
      if (higherValuesWeather.indexOf(field) !== -1) {
        higherWeatherComponents[higherValuesWeather.indexOf(field)].value =
          data[field];
      }
      if (datesFields.indexOf(field) !== -1) {
        databaseComponents[datesFields.indexOf(field)].value = data[field];
      }
      if (astronomicDatabase.indexOf(field) !== -1) {
        data[field] === "Day"
          ? (astronomicComponents[
              astronomicDatabase.indexOf(field)
            ].checked = true)
          : (astronomicComponents[
              astronomicDatabase.indexOf(field)
            ].checked = true);
      }
    }
  }

  let change_interval = document.getElementById("change_button");

  change_interval.addEventListener("click", changeTimeInterval);
  function changeTimeInterval() {
    function displayTimeElements() {
      let time_interval = document.querySelector(".time_filtres");
      let update_interval_button = document.getElementById(
        "update_interval_button"
      );
      time_interval.style.display = "flex";
      update_interval_button.style.display = "flex";
    }

    function getNewTimeValues() {
      let newTimeValues = {};
      for (let i = 0; i < databaseComponents.length; i++) {
        if (datesComponents[i].value !== "") {
          newTimeValues[datesFields[i]] = datesComponents[i].value.toString();
        }
      }
      console.log(newTimeValues);
    }

    displayTimeElements();
    getNewTimeValues();
  }
});
