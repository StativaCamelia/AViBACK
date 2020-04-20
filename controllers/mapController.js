const { mapPage } = require("../views/index");

class MapController {
  constructor(database) {
    this.database = database;
  }

  async getMapPage(req, res) {
    try {
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
      const ids = ["", "", "active", "", ""];
      const { content, contentType } = mapPage.getMapPage(
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

module.exports = MapController;
