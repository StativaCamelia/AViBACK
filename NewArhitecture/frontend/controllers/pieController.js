const axios = require("axios");
const { piePage } = require("../views/index");

class PieController {
  constructor(database) {
    this.database = database;
  }

  async getPiePage(req, res) {
    try {
      let statesValues, countiesValues, citiesValues, streetsValues, timezoneValues;
      await axios({
        url: "http://localhost:5004/accidents/location",
        method: "get"
      }).then((response) => {

        statesValues = response.data.content.statesValues;
        countiesValues = response.data.content.countiesValues;
        citiesValues = response.data.content.citiesValues;
        streetsValues = response.data.content.streetsValues;
        timezoneValues = response.data.content.timezoneValues;
      }).catch((error) => {
        console.log(error)
      });

      // if(Object.keys(req.queryStringObject).length !== 0){
      //   let parsedQueryString = req.queryStringObject;
      //   if(parsedQueryString.State){
      //     parsedQueryString.State = await this.database.State.getAbbrByName(
      //         parsedQueryString.State
      //     );
      //   }
      //   if(parsedQueryString.Start_Time){
      //     if(parsedQueryString.Start_Time.length > 2){
      //       parsedQueryString.Start_Time = parsedQueryString.Start_Time.replace("T"," ");
      //     }
      //     parsedQueryString.Start_Time = parsedQueryString.Start_Time + ":";
      //     parsedQueryString.Start_Time = { "$regex" : parsedQueryString.Start_Time, "$options" : "i" };
      //   }
      //
      //   let pieCriterion = parsedQueryString.Pie_Criterion;
      //   console.log(pieCriterion)
      //
      //   delete parsedQueryString.Pie_Criterion;
      //   console.log(parsedQueryString);
      //
      //   const countResults = await this.database.Accident.getAccidentsCount(parsedQueryString);
      //   console.log(countResults)
      // }


      let numbersValues = [];
      for (var i = 0; i < 9997; i = i + 10) {
        numbersValues.push(i.toString());
      }


      const roadSideValues = ["Right", "Left"];
      const weatherValues = [
        "Blowing Dust",
        "Blowing Dust / Windy",
        "Blowing Sand",
        "Blowing Snow",
        "Blowing Snow / Windy",
        "Clear",
        "Cloudy",
        "Cloudy / Windy",
        "Drizzle",
        "Drizzle / Windy",
        "Drizzle and Fog",
        "Dust Whirls",
        "Fair",
        "Fair / Windy",
        "Fog",
        "Fog / Windy",
        "Freezing Rain",
        "Freezing Rain / Windy",
        "Funnel Cloud",
        "Hail",
        "Haze",
        "Haze / Windy",
        "Heavy Blowing Snow",
        "Heavy Drizzle",
        "Heavy Freezing Drizzle",
        "Heavy Freezing Rain",
        "Heavy Ice Pellets",
        "Heavy Rain",
        "Heavy Rain / Windy",
        "Heavy Rain Showers",
        "Heavy Sleet",
        "Heavy Smoke",
        "Heavy Snow",
        "Heavy Snow / Windy",
        "Heavy Snow with Thunder",
        "Heavy T-Storm",
        "Heavy T-Storm / Windy",
        "Heavy Thunderstorms and Rain",
        "Heavy Thunderstorms and Snow",
        "Heavy Thunderstorms with Small Hail",
        "Ice Pellets",
        "Light Blowing Snow",
        "Light Drizzle",
        "Light Drizzle / Windy",
        "Light Fog",
        "Light Freezing Drizzle",
        "Light Freezing Fog",
        "Light Freezing Rain",
        "Light Freezing Rain / Windy",
        "Light Hail",
        "Light Haze",
        "Light Ice Pellets",
        "Light Rain",
        "Light Rain / Windy",
        "Light Rain Shower",
        "Light Rain Shower / Windy",
        "Light Rain Showers",
        "Light Rain with Thunder",
        "Light Sleet",
        "Light Snow",
        "Light Snow / Windy",
        "Light Snow Grains",
        "Light Snow Shower",
        "Light Snow Showers",
        "Light Snow and Sleet",
        "Light Snow and Sleet / Windy",
        "Light Snow with Thunder",
        "Light Thunderstorm",
        "Light Thunderstorms and Rain",
        "Light Thunderstorms and Snow",
        "Low Drifting Snow",
        "Mist",
        "Mostly Cloudy",
        "Mostly Cloudy / Windy",
        "N/A Precipitation",
        "Overcast",
        "Partial Fog",
        "Partial Fog / Windy",
        "Partly Cloudy",
        "Partly Cloudy / Windy",
        "Patches of Fog",
        "Rain",
        "Rain / Windy",
        "Rain Shower",
        "Rain Showers",
        "Sand",
        "Sand / Dust Whirlwinds",
        "Sand / Dust Whirlwinds / Windy",
        "Scattered Clouds",
        "Shallow Fog",
        "Showers in the Vicinity",
        "Sleet",
        "Small Hail",
        "Smoke",
        "Smoke / Windy",
        "Snow",
        "Snow / Windy",
        "Snow Grains",
        "Snow Showers",
        "Snow and Sleet",
        "Snow and Sleet / Windy",
        "Snow and Thunder",
        "Squalls",
        "Squalls / Windy",
        "T-Storm",
        "T-Storm / Windy",
        "Thunder",
        "Thunder / Windy",
        "Thunder / Wintry Mix / Windy",
        "Thunder and Hail / Windy",
        "Thunder in the Vicinity",
        "Thunderstorm",
        "Thunderstorms and Rain",
        "Thunderstorms and Snow",
        "Tornado",
        "Volcanic Ash",
        "Widespread Dust",
        "Widespread Dust/Windy",
        "Wintry Mix",
        "Wintry Mix/Windy",
      ];
      const windDirectionValues = [
        "CALM",
        "Calm",
        "E",
        "ENE",
        "ESE",
        "East",
        "N",
        "NE",
        "NNE",
        "NNW",
        "NW",
        "North",
        "S",
        "SE",
        "SSE",
        "SSW",
        "SW",
        "South",
        "VAR",
        "Variable",
        "W",
        "WNW",
        "WSW",
        "West",
      ];
      const ids = ["", "", "", "active", ""];
      const { content, contentType } = piePage.getPiePage(
        statesValues,
        countiesValues,
        citiesValues,
        streetsValues,
        numbersValues,
        timezoneValues,
        roadSideValues,
        weatherValues,
        windDirectionValues,
        ids
      );
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = PieController;