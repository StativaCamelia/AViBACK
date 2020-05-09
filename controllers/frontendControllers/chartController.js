const { chartPage } = require("../../views/index");

class ChartController {
  constructor(database) {
    this.database = database;
  }

  async getChartPage(req, res) {
    try {
      if(Object.keys(req.queryStringObject).length !== 0){
        let parsedQueryString = req.queryStringObject;
        if(parsedQueryString.State){
          parsedQueryString.State = await this.database.State.getAbbrByName(
              parsedQueryString.State
          );
        }
        if(parsedQueryString.Start_Time){
          if(parsedQueryString.Start_Time.length > 2){
            parsedQueryString.Start_Time = parsedQueryString.Start_Time.replace("T"," ");
          }
          parsedQueryString.Start_Time = parsedQueryString.Start_Time + ":";
          parsedQueryString.Start_Time = { "$regex" : parsedQueryString.Start_Time, "$options" : "i" };
        }

        console.log(parsedQueryString)
        const countResults = await this.database.Accident.getAccidentsCount(parsedQueryString);
        console.log(countResults)

      }

      const statesValues = await this.database.State.getAllStatesViews();
      const countiesValues = await this.database.County.getAllCountiesViews();
      const citiesValues = await this.database.City.getAllCitiesViews();
      const streetsValues = await this.database.Street.getAllStreetsViews();
      const numbersValues = await this.database.Accident.find({}).distinct(
        "Number"
      );
      const timezoneValues = await this.database.State.getAllTimezones();
      const roadSideValues = ["Right", "Left"];
      const weatherValues = await this.database.Accident.find({}).distinct(
        "Weather_Condition"
      );
      const windDirectionValues = await this.database.Accident.find(
        {}
      ).distinct("Wind_Direction");
      const ids = ["", "", "", "", "active"];
      const { content, contentType } = chartPage.getChartPage(
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

module.exports = ChartController;
