document.addEventListener("DOMContentLoaded", function () {
  const api = "http://localhost:5004/accidents?";
  const method = "GET";
  const criterionMoreValues = [
    "State",
    "County",
    "City",
    "Street",
    "Number",
    "Timezone",
    "Weather",
    "Wind direction",
    "Temperature",
    "Wind chill",
    "Wind speed",
    "Humidity",
    "Pressure",
    "Visibility",
    "Precipitation",
    "Severity",
    "Hour",
  ];
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
        setVisible("#loading", false);
        setVisible("#left_cont", true);
        const { content } = JSON.parse(this.responseText);
        representResponseData(content);
      }
    };
    url = api + query;
    xhttp.open(method, url, true);
    xhttp.send();
  }

  function representResponseData(content) {
    if (
      content.length > 2 &&
      criterionMoreValues.indexOf(pieCriteria.value) !== -1
    ) {
      generateValuesList(content);
    } else {
      if (pieCriteria.value === "Accident date") {
        generateAccidentDateOptions(content);
      } else {
        generatePie(content);
      }
    }
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
  const resetFilters = document.getElementById("reset_button");
  const pieCriteria = document.getElementById("pie_criteria");
  const filtersForm = document.getElementById("filters_form");
  const filtersPieNew = document.getElementById("filters_pie_new");
  const submitPieButton = document.getElementById("submit_checkboxes");
  const backPieButton = document.getElementById("back_filters");
  const selectAllButton = document.getElementById("select_all");
  let message = document.getElementById("filter_message");
  const filtersPieDown = document.getElementById("filters_pie_down");
  const checkboxPie = document.querySelector(".checkbox_pie");
  const radioPie = document.querySelector(".radio_pie");
  const checkboxesButtons = document.querySelector(".checkboxes_buttons");
  const years = document.getElementById("years");
  const months = document.getElementById("months");
  const days = document.getElementById("days");
  const daysOfWeek = document.getElementById("days_of_week");
  const allDates = document.getElementById("all_dates");
  let criterion;

  filtersForm.addEventListener("change", criterionForPie);
  resetFilters.addEventListener("click", function () {
    deletePieCriteriaNodes();
    generatePie([]);
    let errorMessageResult = document.getElementById("error_message_result");
    errorMessageResult.innerText = "";
  });

  submitFilters.addEventListener("click", handlerSubmitFilters);

  function handlerSubmitFilters(e) {
    e.preventDefault();
    goOnTop();
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

    filtersValues.Pie_Criterion = editCriterion(pieCriteria.value);
    criterion = filtersValues.Pie_Criterion;
    queryString = concatQueryString(queryString, "Pie_Criterion", criterion);
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
    const valuesLikeNameOptions = ["State", "County", "City", "Street", "Number", "Timezone", "Weather", "Wind direction"];
    for (let i = 0; i < valuesLikeNamesComponents.length; i++) {
      if (valuesLikeNamesComponents[i].value === valuesLikeNames[i]) {
        options.push(valuesLikeNameOptions[i]);
      }
    }
    const valuesEmptyStringOptions = ["Temperature", "Wind chill", "Wind speed", "Humidity", "Pressure", "Visibility", "Precipitation"];
    for(let i = 0; i < lowerValuesComponents.length; i++){
      if(lowerValuesComponents[i].value === "" && higherValuesComponents[i].value === ""){
        options.push(valuesEmptyStringOptions[i]);
      }
    }
    if(dateValuesComponents[0].value === "" && dateValuesComponents[1].value === ""){
      options.push("Accident date");
    }
    if(dateValuesComponents[2].value === "" && dateValuesComponents[3].value === ""){
      options.push("Hour");
    }
    if(roadSide.value === "Side"){
      options.push("Road side");
    }
    if(severity.value === "0"){
      options.push("Severity");
    }
    const dayNightOptions = ["Sunrise/Sunset", "Civil twilight", "Nautical twilight", "Astronomical twilight"];
    for(let i = 0; i < valuesDayComponents.length; i++){
      if(valuesDayComponents[i].checked === false && valuesNightComponents[i].checked === false){
        options.push(dayNightOptions[i]);
      }
    }
    return options;
  }

  function createCriterionOptions(options) {
    for (let i = 0; i < options.length; i++) {
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
    if (filtersValues.FirstDate > filtersValues.SecondDate) {
      message.innerText = "First date must be smaller than second date!";
      return false;
    } else {
      if (filtersValues.FirstHour > filtersValues.SecondHour) {
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
    const ok = verifyWeatherFiltres(filtersValues);
    const okDate = verifyDates(filtersValues);
    const okCriterion = verifyExistCriterion(filtersValues);
    if (ok && okDate && okCriterion) message.innerText = "";
    return ok && okDate && okCriterion;
  }

  function goOnTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

  function nextStepFilters() {
    filtersForm.style.display = "none";
    filtersPieDown.style.display = "none";
    filtersPieNew.style.display = "flex";
    filtersPieNew.style.flexDirection = "column";
  }

  function generateAccidentDateOptions(content) {
    nextStepFilters();
    radioPie.style.display = "flex";
    const okButton = document.getElementById("select_radio");
    okButton.addEventListener("click", () => {
      if (years.checked) {
        generateValuesList(content.years, " -year ");
      } else {
        if (months.checked) {
          generateValuesList(content.months, " -month ");
        } else {
          if (days.checked) {
            generateValuesList(content.days, " -day ");
          } else {
            if (daysOfWeek.checked) {
              generateValuesList(content.daysOfWeek, " -day ");
            } else {
              if (allDates.checked) {
                generateValuesList(content.allDates);
              }
            }
          }
        }
      }
    });
  }

  function generateValuesList(content, dateField) {
    nextStepFilters();
    checkboxesButtons.style.display = "flex";
    deleteElementNodes(checkboxPie);

    const { info, data } = createArraysFromContent(content);
    for (let i = 0; i < info.length; i++) {
      let div = document.createElement("div");
      div.className = "checkbox_pie_element";
      let input = document.createElement("input");
      input.type = "checkbox";
      input.name = info[i];
      input.id = info[i];
      let label = document.createElement("label");
      label.htmlFor = info[i];
      label.innerText = info[i];
      div.appendChild(input);
      div.appendChild(label);
      checkboxPie.appendChild(div);
    }
    submitPieButton.addEventListener("click", () => {
      let newContent = [];
      let checkboxes = checkboxPie.children;
      for (let i = 0; i < checkboxes.length; i++) {
        let input = checkboxes[i].getElementsByTagName("input");
        let newContentElem = {};
        if (input[0].checked) {
          newContentElem._id = info[i];
          newContentElem.count = data[i];
          newContent.push(newContentElem);
        }
      }
      generatePie(newContent, dateField);
    });

    backPieButton.addEventListener("click", () => {
      deleteElementNodes(checkboxPie);
      years.checked = false;
      months.checked = false;
      days.checked = false;
      daysOfWeek.checked = false;
      allDates.checked = false;
      filtersForm.style.display = "block";
      filtersPieNew.style.display = "none";
      filtersPieDown.style.display = "flex";
      checkboxesButtons.style.display = "none";
      radioPie.style.display = "none";
    });

    selectAllButton.addEventListener("click", () => {
      let allCheckboxes = checkboxPie.children;
      for (let i = 0; i < allCheckboxes.length; i++) {
        let input = allCheckboxes[i].getElementsByTagName("input");
        input[0].checked = true;
      }
    });
  }

  function editCriterion(criterion) {
    const caseValues = ["Road side","Weather","Wind direction","Temperature","Wind chill","Wind speed","Humidity","Pressure","Visibility","Precipitation","Accident date","Hour","Sunrise/Sunset","Civil twilight","Nautical twilight","Astronomical twilight"];
    const returnValues = ["Side","Weather_Condition","Wind_Direction","Temperature(F)","Wind_Chill(F)","Wind_Speed(mph)","Humidity(%)","Pressure(in)","Visibility(mi)","Precipitation(in)","Start_Date","Start_Hour","Sunrise_Sunset","Civil_Twilight","Nautical_Twilight","Astronomical_Twilight"];
    for(let i = 0; i < caseValues.length; i++){
      if(criterion === caseValues[i]){
        return returnValues[i];
      }
    }
    return criterion;
  }

  function deletePieLegend() {
    const legendPie = document.querySelector(".legend_pie");
    deleteElementNodes(legendPie);
  }

  function errorMessage() {
    let errorMessageResult = document.getElementById("error_message_result");
    errorMessageResult.innerText = "NO DATA FOUND!";
  }

  function deleteErrorMessage() {
    let errorMessageResult = document.getElementById("error_message_result");
    errorMessageResult.innerText = "";
  }

  function generatePieLegend(dataProcents, data, info, dateField) {
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
        let text1 = info[i];
        let text2 = dateField ? dateField : " ";
        return (
          pieCriteria.value +
          text2 +
          text1 +
          ": " +
          number +
          " accidents (" +
          dataProcents[i].toFixed(2) +
          "%)"
        );
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

  function createArraysFromContent(content) {
    let data = [];
    let info = [];
    for (let i = 0; i < content.length; i++) {
      if (content[i]._id) {
        data.push(content[i].count);
        info.push(content[i]._id);
      }
    }
    return { data: data, info: info };
  }

  function generatePie(dataResponse, dateField) {
    goOnTop();
    dataResponse.sort(function (a, b) {
      return b.count - a.count;
    });
    let data = [];
    let info = [];

    if (Object.keys(dataResponse).length === 0) {
      data = [100];
      errorMessage();
    } else {
      const arraysFromContent = createArraysFromContent(dataResponse);
      data = arraysFromContent.data;
      info = arraysFromContent.info;
    }

    let total = 0;
    data.map((number) => (total += number));

    let dataProcents = [];
    data.map((number) => dataProcents.push((number * 100) / total));

    drawPie(dataProcents);
    deletePieLegend();

    if (Object.keys(dataResponse).length !== 0) {
      generatePieLegend(dataProcents, data, info, dateField);
    }
  }

  function deleteElementNodes(element) {
    while (element.firstChild) {
      element.removeChild(element.lastChild);
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
