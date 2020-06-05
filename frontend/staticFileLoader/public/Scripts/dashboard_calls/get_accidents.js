document.addEventListener("DOMContentLoaded", function () {
    const url = "http://localhost:5004/accidents";
    const authToken = localStorage.getItem("auth-token");

    function sendRequestCreate(accident) {
        let xhttp = new XMLHttpRequest();
        xhttp.open("post", url, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send(JSON.stringify(accident));
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 201) {
                    createAccidentMessage.innerText = "ACCIDENT CREATED!";
                } else {
                    console.log(response.error);
                    createAccidentMessage.innerText = "ACCIDENT NOT CREATED!";
                }
            }
        };
    }

    function sendRequestGetById(accidentIdValue) {
        let xhttp = new XMLHttpRequest();
        const urlWithId = url + "?accidentId=" + accidentIdValue;
        xhttp.open("get", urlWithId, true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 200) {
                    createGetAccidentResult(response.content);
                } else {
                    console.log(response.error);
                }
            }
        };
    }

    function sendRequestGet(dateOne,dateTwo) {
        let xhttp = new XMLHttpRequest();
        let urlWithDates = url;
        if(dateOne && dateTwo){
            urlWithDates += "?dateOne=" + dateOne + "&dateTwo=" + dateTwo;
        }else{
            if(dateOne){
                urlWithDates += "?dateOne=" + dateOne;
            }else{
                if(dateTwo){
                    urlWithDates += "?dateTwo=" + dateTwo;
                }else{
                    urlWithDates += "?dateOne=2016-03-01&dateTwo=2016-06-01";
                }
            }
        }
        xhttp.open("get", urlWithDates, true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 200) {
                    createGetAccidentsResult(response.content);
                } else {
                    console.log(response.error);
                }
            }
        };
    }

    function sendRequestUpdate(accidentIdValue,accident) {
        let xhttp = new XMLHttpRequest();
        const urlWithId = url + "?accidentId=" + accidentIdValue;
        xhttp.open("put", urlWithId, true);
        xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send(JSON.stringify(accident));
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 200) {
                    updateAccidentMessage.innerText = "ACCIDENT UPDATED!";
                } else {
                    console.log(response.error);
                    updateAccidentMessage.innerText = "ACCIDENT NOT UPDATED!";
                }
            }
        };
    }

    function sendRequestDeleteById(accidentIdValue) {
        let xhttp = new XMLHttpRequest();
        const urlWithId = url + "?accidentId=" + accidentIdValue;
        xhttp.open("delete", urlWithId, true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 200) {
                    deleteAccidentMessage.innerText = "ACCIDENT DELETED!";
                } else {
                    console.log(response.error);
                    deleteAccidentMessage.innerText = "ACCIDENT NOT DELETED!";
                }
            }
        };
    }

    function sendRequestDeleteAll() {
        let xhttp = new XMLHttpRequest();
        xhttp.open("delete", url, true);
        xhttp.setRequestHeader("auth-token", authToken ? authToken : "");
        xhttp.send();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4) {
                const response = JSON.parse(this.responseText);
                if (this.status === 200) {
                    deleteAccidentsMessage.innerText = "ALL ACCIDENTS DELETED!";
                } else {
                    console.log(response.error);
                    deleteAccidentsMessage.innerText = "ACCIDENTS NOT DELETED!";
                }
            }
        };
    }

    const createAccident = document.getElementById("create_accident");
    const childCreateAccident = createAccident.childNodes;
    const readAccident = document.getElementById("read_accident");
    const childReadAccident = readAccident.childNodes;
    const readAccidents = document.getElementById("read_accidents");
    const childReadAccidents = readAccidents.childNodes;
    const updateAccident = document.getElementById("update_accident");
    const childUpdateAccident = updateAccident.childNodes;
    const deleteAccident = document.getElementById("delete_accident");
    const childDeleteAccident = deleteAccident.childNodes;
    const deleteAllAccidents = document.getElementById("delete_all_accidents");
    const childDeleteAccidents = deleteAllAccidents.childNodes;

    //RESET
    function resetCreateForm() {
        for(let i = 0; i < createValues.length; i++){
            createValues[i].value = "";
        }
        createAccidentMessage.innerText = "";
        childCreateAccident[0].id = "";
        accidentFormCreate.style.display = "none";
    }

    function resetGetAccidentForm() {
        deleteElementNodes(getAccidentResult);
        accidentFormGetAccident.style.display = "none";
        childReadAccident[0].id = "";
        getAccidentId.value = "";
    }

    function resetGetAccidents() {
        deleteElementNodes(getAccidentsResult);
        accidentFormGetAccidents.style.display = "none";
        childReadAccidents[0].id = "";
        getAccidentsDate1.value = "";
        getAccidentsDate2.value = "";
    }

    function resetUpdateForm() {
        for(let i = 0; i < updateValues.length; i++){
            updateValues[i].value = "";
        }
        updateAccidentMessage.innerText = "";
        childUpdateAccident[0].id = "";
        accidentFormUpdate.style.display = "none";
    }

    function resetDeleteAccidentForm() {
        deleteAccidentId.value = "";
        childDeleteAccident[0].id = "";
        accidentFormDeleteAccident.style.display = "none";
        deleteAccidentMessage.innerText = "";
    }

    function resetDeleteAccidentsForm() {
        childDeleteAccidents[0].id = "";
        deleteAccidents.style.display = "none";
        deleteAccidentsMessage.innerText = "";
    }

    //CREATE AN ACCIDENT
    const accidentFormCreate = document.getElementById("accident_form_create");
    const createAccidentState = document.getElementById("create_accident_state");
    const createAccidentCounty = document.getElementById("create_accident_county");
    const createAccidentCity = document.getElementById("create_accident_city");
    const createAccidentStreet = document.getElementById("create_accident_street");
    const createAccidentNumber = document.getElementById("create_accident_number");
    const createAccidentTimezone = document.getElementById("create_accident_timezone");
    const createAccidentStartDate = document.getElementById("create_accident_start_date");
    const createAccidentStartHour = document.getElementById("create_accident_start_hour");
    const createAccidentSide = document.getElementById("create_accident_side");
    const createAccidentWeatherCondition = document.getElementById("create_accident_weather_condition");
    const createAccidentWindDirection = document.getElementById("create_accident_wind_direction");
    const createAccidentTemperature = document.getElementById("create_accident_temperature");
    const createAccidentWindChill = document.getElementById("create_accident_wind_chill");
    const createAccidentHumidity = document.getElementById("create_accident_humidity");
    const createAccidentPressure = document.getElementById("create_accident_pressure");
    const createAccidentVisibility = document.getElementById("create_accident_visibility");
    const createAccidentPrecipitation = document.getElementById("create_accident_precipitation");
    const createAccidentWindSpeed = document.getElementById("create_accident_wind_speed");
    const createAccidentSeverity = document.getElementById("create_accident_severity");
    const createAccidentStartLat = document.getElementById("create_accident_start_lat");
    const createAccidentStartLng = document.getElementById("create_accident_start_lng");
    const createAccidentEndLat = document.getElementById("create_accident_end_lat");
    const createAccidentEndLng = document.getElementById("create_accident_end_lng");
    const createAccidentAmenity = document.getElementById("create_accident_amenity");
    const createAccidentBump = document.getElementById("create_accident_bump");
    const createAccidentCrossing = document.getElementById("create_accident_crossing");
    const createAccidentGiveWay = document.getElementById("create_accident_give_way");
    const createAccidentJunction = document.getElementById("create_accident_junction");
    const createAccidentNoExit = document.getElementById("create_accident_no_exit");
    const createAccidentRailway = document.getElementById("create_accident_railway");
    const createAccidentRoundabout = document.getElementById("create_accident_roundabout");
    const createAccidentStation = document.getElementById("create_accident_station");
    const createAccidentStop = document.getElementById("create_accident_stop");
    const createAccidentTrafficCalming = document.getElementById("create_accident_traffic_calming");
    const createAccidentTrafficSignal = document.getElementById("create_accident_traffic_signal");
    const createAccidentSunriseSunset = document.getElementById("create_accident_sunrise_sunset");
    const createAccidentCivilTwilight = document.getElementById("create_accident_civil_twilight");
    const createAccidentNauticalTwilight = document.getElementById("create_accident_nautical_twilight");
    const createAccidentAstronomicalTwilight = document.getElementById("create_accident_astronomical_twilight");
    const createAccidentDescription = document.getElementById("create_accident_description");
    const submitCreateAccident = document.getElementById("submit_create_accident");
    const createAccidentMessage = document.getElementById("create_accident_message");

    const accidentValues = ["State", "County", "City", "Street", "Number", "Timezone", "Start_Date", "Start_Hour", "Side", "Weather_Condition", "Wind_Direction", "Temperature(F)", "Wind_Chill(F)", "Humidity(%)", "Pressure(in)", "Visibility(mi)", "Precipitation(in)", "Wind_Speed(mph)", "Severity", "Start_Lat", "Start_Lng", "End_Lat", "End_Lng", "Amenity", "Bump", "Crossing", "Give_Way", "Junction", "No_Exit", "Railway", "Roundabout", "Traffic_Calming", "Stop", "Station", "Traffic_Signal", "Sunrise_Sunset", "Civil_Twilight", "Nautical_Twilight", "Astronomical_Twilight", "Description"];
    const createValues = [createAccidentState, createAccidentCounty, createAccidentCity, createAccidentStreet, createAccidentNumber, createAccidentTimezone, createAccidentStartDate, createAccidentStartHour, createAccidentSide, createAccidentWeatherCondition, createAccidentWindDirection, createAccidentTemperature, createAccidentWindChill, createAccidentHumidity, createAccidentPressure, createAccidentVisibility, createAccidentPrecipitation, createAccidentWindSpeed, createAccidentSeverity, createAccidentStartLat, createAccidentStartLng, createAccidentEndLat, createAccidentEndLng, createAccidentAmenity, createAccidentBump, createAccidentCrossing, createAccidentGiveWay, createAccidentJunction, createAccidentNoExit, createAccidentRailway, createAccidentRoundabout, createAccidentStation, createAccidentStop, createAccidentTrafficCalming, createAccidentTrafficSignal, createAccidentSunriseSunset, createAccidentCivilTwilight, createAccidentNauticalTwilight, createAccidentAstronomicalTwilight, createAccidentDescription];

    createAccident.addEventListener("click",() => {
        resetGetAccidentForm();
        resetGetAccidents();
        resetUpdateForm();
        resetDeleteAccidentForm();
        resetDeleteAccidentsForm();
        childCreateAccident[0].id = "active_accident";
        accidentFormCreate.style.display = "flex";
        submitCreateAccident.addEventListener("click",(e) => {
            e.preventDefault();
            let accident = {};
            for(let i = 0; i < accidentValues.length; i++){
                accident[accidentValues[i]] = createValues[i].value;
            }
            if (accident.Start_Hour){
                accident.Start_Hour = accident.Start_Hour.substring(0,5);
            }
            sendRequestCreate(accident);
        });
    });

    //GET AN ACCIDENT BY ID
    const accidentFormGetAccident = document.getElementById("accident_form_get_accident");
    const getAccidentId = document.getElementById("get_accident_id");
    const submitGetAccident = document.getElementById("submit_get_accident");
    const getAccidentResult = document.getElementById("get_accident_result");
    readAccident.addEventListener("click",() => {
        resetCreateForm();
        resetGetAccidents();
        resetUpdateForm();
        resetDeleteAccidentForm();
        resetDeleteAccidentsForm();
        childReadAccident[0].id = "active_accident";
        accidentFormGetAccident.style.display = "flex";
        submitGetAccident.addEventListener("click",(e) => {
           e.preventDefault();
           const accidentIdValue = getAccidentId.value;
           sendRequestGetById(accidentIdValue);
        });
    });
    function createGetAccidentResult(accident) {
        deleteElementNodes(getAccidentResult);
        const ul = document.createElement("ul");
        let accidentDetails = [];
        accidentDetails.push("Id: " + accident._id);
        for(let i = 0; i < accidentValues.length; i++){
            const details = accidentValues[i] + ": " + accident[accidentValues[i]];
            accidentDetails.push(details);
        }
        for (let i = 0; i < accidentDetails.length; i++) {
            let li = document.createElement("li");
            li.innerText = accidentDetails[i];
            ul.appendChild(li);
        }
        getAccidentResult.appendChild(ul);
    }

    //GET ACCIDENTS
    const accidentFormGetAccidents = document.getElementById("accident_form_get_accidents");
    const getAccidentsDate1 = document.getElementById("get_accidents_date1");
    const getAccidentsDate2 = document.getElementById("get_accidents_date2");
    const submitGetAccidents = document.getElementById("submit_get_accidents");
    const getAccidentsResult = document.getElementById("get_accidents_result");
    readAccidents.addEventListener("click",() => {
        resetCreateForm();
        resetGetAccidentForm();
        resetUpdateForm();
        resetDeleteAccidentForm();
        resetDeleteAccidentsForm();
        childReadAccidents[0].id = "active_accident";
        accidentFormGetAccidents.style.display = "flex";
        submitGetAccidents.addEventListener("click",(e) => {
           e.preventDefault();
           const dateOne = getAccidentsDate1.value;
           const dateTwo = getAccidentsDate2.value;
           sendRequestGet(dateOne,dateTwo);
        });
    });

    function createGetAccidentsResult(accidents) {
        deleteElementNodes(getAccidentsResult);
        for (let i = 0; i < accidents.length; i++) {
            const div = document.createElement("div");
            const accident = accidents[i];
            let accidentDetails = [];
            accidentDetails.push("Id: " + accident._id);
            for(let i = 0; i < accidentValues.length; i++){
                const details = accidentValues[i] + ": " + accident[accidentValues[i]];
                accidentDetails.push(details);
            }
            const ul = document.createElement("ul");
            for (let j = 0; j < accidentDetails.length; j++) {
                let li = document.createElement("li");
                li.innerText = accidentDetails[j];
                ul.appendChild(li);
            }
            div.appendChild(ul);
            getAccidentsResult.appendChild(div);
        }
    }

    //UPDATE AN ACCIDENT
    const accidentFormUpdate = document.getElementById("accident_form_update");
    const updateAccidentId = document.getElementById("update_accident_id");
    const updateAccidentState = document.getElementById("update_accident_state");
    const updateAccidentCounty = document.getElementById("update_accident_county");
    const updateAccidentCity = document.getElementById("update_accident_city");
    const updateAccidentStreet = document.getElementById("update_accident_street");
    const updateAccidentNumber = document.getElementById("update_accident_number");
    const updateAccidentTimezone = document.getElementById("update_accident_timezone");
    const updateAccidentStartDate = document.getElementById("update_accident_start_date");
    const updateAccidentStartHour = document.getElementById("update_accident_start_hour");
    const updateAccidentSide = document.getElementById("update_accident_side");
    const updateAccidentWeatherCondition = document.getElementById("update_accident_weather_condition");
    const updateAccidentWindDirection = document.getElementById("update_accident_wind_direction");
    const updateAccidentTemperature = document.getElementById("update_accident_temperature");
    const updateAccidentWindChill = document.getElementById("update_accident_wind_chill");
    const updateAccidentHumidity = document.getElementById("update_accident_humidity");
    const updateAccidentPressure = document.getElementById("update_accident_pressure");
    const updateAccidentVisibility = document.getElementById("update_accident_visibility");
    const updateAccidentPrecipitation = document.getElementById("update_accident_precipitation");
    const updateAccidentWindSpeed = document.getElementById("update_accident_wind_speed");
    const updateAccidentSeverity = document.getElementById("update_accident_severity");
    const updateAccidentStartLat = document.getElementById("update_accident_start_lat");
    const updateAccidentStartLng = document.getElementById("update_accident_start_lng");
    const updateAccidentEndLat = document.getElementById("update_accident_end_lat");
    const updateAccidentEndLng = document.getElementById("update_accident_end_lng");
    const updateAccidentAmenity = document.getElementById("update_accident_amenity");
    const updateAccidentBump = document.getElementById("update_accident_bump");
    const updateAccidentCrossing = document.getElementById("update_accident_crossing");
    const updateAccidentGiveWay = document.getElementById("update_accident_give_way");
    const updateAccidentJunction = document.getElementById("update_accident_junction");
    const updateAccidentNoExit = document.getElementById("update_accident_no_exit");
    const updateAccidentRailway = document.getElementById("update_accident_railway");
    const updateAccidentRoundabout = document.getElementById("update_accident_roundabout");
    const updateAccidentStation = document.getElementById("update_accident_station");
    const updateAccidentStop = document.getElementById("update_accident_stop");
    const updateAccidentTrafficCalming = document.getElementById("update_accident_traffic_calming");
    const updateAccidentTrafficSignal = document.getElementById("update_accident_traffic_signal");
    const updateAccidentSunriseSunset = document.getElementById("update_accident_sunrise_sunset");
    const updateAccidentCivilTwilight = document.getElementById("update_accident_civil_twilight");
    const updateAccidentNauticalTwilight = document.getElementById("update_accident_nautical_twilight");
    const updateAccidentAstronomicalTwilight = document.getElementById("update_accident_astronomical_twilight");
    const updateAccidentDescription = document.getElementById("update_accident_description");
    const submitUpdateAccident = document.getElementById("submit_update_accident");
    const updateAccidentMessage = document.getElementById("update_accident_message");
    const updateValues = [updateAccidentState, updateAccidentCounty, updateAccidentCity, updateAccidentStreet, updateAccidentNumber, updateAccidentTimezone, updateAccidentStartDate, updateAccidentStartHour, updateAccidentSide, updateAccidentWeatherCondition, updateAccidentWindDirection, updateAccidentTemperature, updateAccidentWindChill, updateAccidentHumidity, updateAccidentPressure, updateAccidentVisibility, updateAccidentPrecipitation, updateAccidentWindSpeed, updateAccidentSeverity, updateAccidentStartLat, updateAccidentStartLng, updateAccidentEndLat, updateAccidentEndLng, updateAccidentAmenity, updateAccidentBump, updateAccidentCrossing, updateAccidentGiveWay, updateAccidentJunction, updateAccidentNoExit, updateAccidentRailway, updateAccidentRoundabout, updateAccidentStation, updateAccidentStop, updateAccidentTrafficCalming, updateAccidentTrafficSignal, updateAccidentSunriseSunset, updateAccidentCivilTwilight, updateAccidentNauticalTwilight, updateAccidentAstronomicalTwilight, updateAccidentDescription];

    updateAccident.addEventListener("click",() => {
        resetCreateForm();
        resetGetAccidentForm();
        resetGetAccidents();
        resetDeleteAccidentForm();
        resetDeleteAccidentsForm();
        childUpdateAccident[0].id = "active_accident";
        accidentFormUpdate.style.display = "flex";
        submitUpdateAccident.addEventListener("click",(e) => {
            e.preventDefault();
            const accidentIdValue = updateAccidentId.value;
            let accident = {};
            for(let i = 0; i < updateValues.length; i++){
                if(updateValues[i].value !== ""){
                    accident[accidentValues[i]] = updateValues[i].value;
                }
            }
            if (accident.Start_Hour){
                accident.Start_Hour = accident.Start_Hour.substring(0,5);
            }
            sendRequestUpdate(accidentIdValue,accident);
        });
    });

    //DELETE AN ACCIDENT
    const accidentFormDeleteAccident = document.getElementById("accident_form_delete_accident");
    const deleteAccidentId = document.getElementById("delete_accident_id");
    const submitDeleteAccident = document.getElementById("submit_delete_accident");
    const deleteAccidentMessage = document.getElementById("delete_accident_message");
    deleteAccident.addEventListener("click",() => {
        resetCreateForm();
        resetGetAccidentForm();
        resetGetAccidents();
        resetUpdateForm();
        resetDeleteAccidentsForm();
        childDeleteAccident[0].id = "active_accident";
        accidentFormDeleteAccident.style.display = "flex";
        submitDeleteAccident.addEventListener("click",(e) => {
            e.preventDefault();
            const accidentIdValue = deleteAccidentId.value;
            sendRequestDeleteById(accidentIdValue);
        });
    });

    //DELETE ALL ACCIDENTS
    const deleteAccidents = document.getElementById("delete_accidents");
    const submitDeleteAccidents = document.getElementById("submit_delete_accidents");
    const deleteAccidentsMessage = document.getElementById("delete_accidents_message");
    deleteAllAccidents.addEventListener("click",() => {
        resetCreateForm();
        resetGetAccidentForm();
        resetGetAccidents();
        resetUpdateForm();
        resetDeleteAccidentForm();
        childDeleteAccidents[0].id = "active_accident";
        deleteAccidents.style.display = "flex";
        submitDeleteAccidents.addEventListener("click",(e) => {
           e.preventDefault();
           sendRequestDeleteAll();
        });
    });

    function deleteElementNodes(element) {
        while (element.firstChild) {
            element.removeChild(element.lastChild);
        }
    }
});
