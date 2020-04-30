document.addEventListener("DOMContentLoaded",function () {
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
    const nauticalTwilightNight = document.getElementById("nautical_twilight_night");
    const astronomicalTwilightDay = document.getElementById("astronomical_twilight_day");
    const astronomicalTwilightNight = document.getElementById("astronomical_twilight_night");
    const submitFilters = document.getElementById("submit_button");

    submitFilters.addEventListener("click",handlerSubmitFilters);

    function handlerSubmitFilters(e) {
        e.preventDefault();
        let filtersValues = {};
        if(state.value !== "state"){
            filtersValues.State = state.value;
        }
        if(county.value !== "county"){
            filtersValues.County = county.value;
        }
        if(city.value !== "city"){
            filtersValues.City =  city.value;
        }
        if(street.value !== "street"){
            filtersValues.Street = street.value;
        }
        if(number.value !== "number"){
            filtersValues.Number = number.value;
        }
        if(timezone.value !== "timezone"){
            filtersValues.Timezone = timezone.value;
        }
        if(roadSide.value !== ""){
            filtersValues.Side = (roadSide.value === "Left" ? "L" : "R");
        }
        if(weather.value !== ""){
            filtersValues.Weather_Condition = weather.value;
        }
        if(windDirection.value !== ""){
            filtersValues.Wind_Direction = windDirection.value;
        }
        if(temperature.value !== ""){
            filtersValues.Temperature = temperature.value.toString();
        }
        if(windChill.value !== ""){
            filtersValues.Wind_Chill = windChill.value.toString();
        }
        if(windSpeed.value !== ""){
            filtersValues.Wind_Speed = windSpeed.value.toString();
        }
        if(humidity.value !== ""){
            filtersValues.Humidity = humidity.value.toString();
        }
        if(pressure.value !== ""){
            filtersValues.Pressure = pressure.value.toString();
        }
        if(visibility.value !== ""){
            filtersValues.Visibility = visibility.value.toString();
        }
        if(amenity.checked){
            filtersValues.Amenity = "True";
        }else{
            filtersValues.Amenity = "False";
        }
        if(bump.checked){
            filtersValues.Bump = "True";
        }else{
            filtersValues.Bump = "False";
        }
        if(crossing.checked){
            filtersValues.Crossing = "True";
        }else{
            filtersValues.Crossing = "False";
        }
        if(giveWay.checked){
            filtersValues.Give_Way = "True";
        }else{
            filtersValues.Give_Way = "False";
        }
        if(junction.checked){
            filtersValues.Junction = "True";
        }else{
            filtersValues.Junction = "False";
        }
        if(noExit.checked){
            filtersValues.No_Exit = "True";
        }else{
            filtersValues.No_Exit = "False";
        }
        if(railway.checked){
            filtersValues.Railway = "True";
        }else{
            filtersValues.Railway = "False";
        }
        if(roundabout.checked){
            filtersValues.Roundabout = "True";
        }else{
            filtersValues.Roundabout = "False";
        }
        if(trafficCalming.checked){
            filtersValues.Traffic_Calming = "True";
        }else{
            filtersValues.Traffic_Calming = "False";
        }
        if(stop.checked){
            filtersValues.Stop = "True";
        }else{
            filtersValues.Stop = "False";
        }
        if(station.checked){
            filtersValues.Station = "True";
        }else{
            filtersValues.Station = "False";
        }
        if(trafficSignal.checked){
            filtersValues.Traffic_Signal = "True";
        }else{
            filtersValues.Traffic_Signal = "False";
        }
        if(accidentDate.value !== ""){
            filtersValues.Date = accidentDate.value.toString();//start_time -> parse
        }
        if(severity.value){
            filtersValues.Severity = severity.value;
        }
        if(hourIn.value !== "0"){
            filtersValues.Hour = hourIn.value.toString();//start_time -> parse
        }
        if(sunriseSunsetDay.checked){
            filtersValues.Sunrise_Sunset = "Day";
        }
        if(sunriseSunsetNight.checked){
            filtersValues.Sunrise_Sunset = "Night";
        }
        if(civilTwilightDay.checked){
            filtersValues.Civil_Twilight = "Day";
        }
        if(civilTwilightNight.checked){
            filtersValues.Civil_Twilight = "Night";
        }
        if(nauticalTwilightDay.checked){
            filtersValues.Nautical_Twilight = "Day";
        }
        if(nauticalTwilightNight.checked){
            filtersValues.Nautical_Twilight = "Night";
        }
        if(astronomicalTwilightDay.checked){
            filtersValues.Astronomical_Twilight = "Day";
        }
        if(astronomicalTwilightNight.checked){
            filtersValues.Astronomical_Twilight = "Night";
        }
        let xhttp = new XMLHttpRequest();
        xhttp.open("post", "http://localhost:5001/filters/", true);
        xhttp.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhttp.send(JSON.stringify(filtersValues));
        xhttp.onreadystatechange = function () {
            if(this.readyState === 4){
                if(this.status === 200){
                    console.log(this.responseText);
                }
            }
        }
    }
});