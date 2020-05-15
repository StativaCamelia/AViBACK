document.addEventListener("DOMContentLoaded", function () {
    const api = "http://localhost:5004/accidents?";
    const method = "GET";

    function send_request(query) {
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const { content } = JSON.parse(this.responseText);
                console.log(content);
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
    const temperature = document.getElementById("temperature");
    const windChill = document.getElementById("wind_chill");
    const windSpeed = document.getElementById("wind_speed");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const visibility = document.getElementById("visibility");
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
    const accidentDate = document.getElementById("accident_date");
    const severity = document.getElementById("severity");
    const hourIn = document.getElementById("hourIN");
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
    const submitFilters = document.getElementById("submit_button");
    const resetFilters = document.getElementById("reset_button");
    const filtersForm = document.getElementById("filters_form");
    const pieCriteria = document.getElementById("pie_criteria");
    let message = document.getElementById("filter_message");

    filtersForm.addEventListener("change", criterionForPie);
    resetFilters.addEventListener("click", function () {
            deletePieCriteriaNodes();
    });

    submitFilters.addEventListener("click", handlerSubmitFilters);

    function handlerSubmitFilters(e) {
        e.preventDefault();
        let filtersValues = {};
        let queryString = "";
        let accidentStartTime;
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
        if (temperature.value !== "") {
            filtersValues.Temperature = temperature.value.toString();
            queryString = concatQueryString(
                queryString,
                "Temperature",
                temperature.value.toString()
            );
        }
        if (windChill.value !== "") {
            filtersValues.Wind_Chill = windChill.value.toString();
            queryString = concatQueryString(
                queryString,
                "Wind_Chill",
                windChill.value.toString()
            );
        }
        if (windSpeed.value !== "") {
            filtersValues.Wind_Speed = windSpeed.value.toString();
            queryString = concatQueryString(
                queryString,
                "Wind_Speed",
                windSpeed.value.toString()
            );
        }
        if (humidity.value !== "") {
            filtersValues.Humidity = humidity.value.toString();
            queryString = concatQueryString(
                queryString,
                "Humidity",
                humidity.value.toString()
            );
        }
        if (pressure.value !== "") {
            filtersValues.Pressure = pressure.value.toString();
            queryString = concatQueryString(
                queryString,
                "Pressure",
                pressure.value.toString()
            );
        }
        if (visibility.value !== "") {
            filtersValues.Visibility = visibility.value.toString();
            queryString = concatQueryString(
                queryString,
                "Visibility",
                visibility.value.toString()
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
        if (accidentDate.value !== "") {
            filtersValues.Start_Time = accidentDate.value.toString();
            accidentStartTime = accidentDate.value.toString();
        }
        if (severity.value !== "0") {
            filtersValues.Severity = severity.value;
            queryString = concatQueryString(
                queryString,
                "Severity",
                severity.value.toString()
            );
        }
        if (hourIn.value !== "0") {
            let value = hourIn.value.toString();
            if (value.length === 1) {
                value = "0" + value;
            }
            if (filtersValues.Start_Time) {
                filtersValues.Start_Time = filtersValues.Start_Time + " " + value + ":";
            } else {
                filtersValues.Start_Time = " " + value + ":";
            }
            if (accidentStartTime) {
                accidentStartTime = accidentStartTime + "T" + value;
            } else {
                accidentStartTime = value;
            }
        }
        queryString = concatQueryString(
            queryString,
            "Start_Time",
            accidentStartTime
        );
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
        filtersValues.Pie_Criterion = pieCriteria.value;
        queryString = concatQueryString(
                queryString,
                "Pie_Criterion",
                pieCriteria.value
        );
        if (verifFiltersPie(filtersValues) === true) {
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
        if (temperature.value === "") {
            options.push("Temperature");
        }
        if (windChill.value === "") {
            options.push("Wind chill");
        }
        if (windSpeed.value === "") {
            options.push("Wind speed");
        }
        if (humidity.value === "") {
            options.push("Humidity");
        }
        if (pressure.value === "") {
            options.push("Pressure");
        }
        if (visibility.value === "") {
            options.push("Visibility");
        }
        if (accidentDate.value === "") {
            options.push("Accident date");
        }
        if (severity.value === "0") {
            options.push("Severity");
        }
        if (hourIn.value === "0") {
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

    function verifFiltersPie(filtersValues) {
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
        } else {
            if (filtersValues.Pie_Criterion === "criterion") {
                message.innerText = "You have to select a criterion!";
                return false;
            } else {
                message.innerText = "";
                return true;
            }
        }
    }
});
