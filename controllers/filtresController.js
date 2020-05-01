class FiltresController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async createFilterDatabase() {
    try {
      const states = await this.database.Accident.getAllStatesEntities();
      for (let stateData of states) {
      
        this.service.stateController.createStateEntity(stateData);
      }
      const counties = await this.database.Accident.getAllCountiesEntities();
      for (let countyData of counties) {
        const stateData = await this.database.State.findOne({
          name: countyData.state,
        });
        const timezone = stateData.timezone;
        countyData.timezone = timezone;
        this.service.countyController.createCountyEntity(countyData);
      }
      const cities = await this.database.Accident.getAllCitiesEntities();
      for (let cityData of cities) {
        const countyData = await this.database.County.findOne({
          name: cityData.county,
        });
        cityData.state = countyData.state;
        cityData.timezone = countyData.timezone;
        this.service.cityController.createCityEntity(cityData);
      }
      const streets = await this.database.Accident.getAllStreetsEntities();
      for (let streetData of streets) {
        const cityData = await this.database.City.findOne({
          name: streetData.city,
        });
        streetData.county = cityData.county;
        streetData.state = cityData.state;
        streetData.timezone = cityData.timezone;
        this.service.streetController.createStreetEntity(streetData);
      }
      const content = "Database succesfully updates";
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getFiltres() {
    try {
      const statesValues = await this.database.State.getAllStatesViews();
      const countiesValues = await this.database.County.getAllCountiesViews({});
      const citiesValues = await this.database.City.getAllCitiesViews({});
      const streetsValues = await this.database.Street.getAllStreetsViews({});
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
    } catch (error) {
      throw error;
    }
  }

  async handlerPostRequest(req, res) {
    const { body } = req;
    let filtersValues = body;
    filtersValues.State = await this.database.State.getAbbrByName(
      filtersValues.State
    );
    //inca un statics pt data si ora..pentru a cauta in Start_Time
    //plus verificare pe data -> anul sa fie intre 2017 si 2019!
    console.log(filtersValues);
    return { statusCode: 200, contentType: "text/html", content: "OK" };
  }
}

module.exports = FiltresController;
