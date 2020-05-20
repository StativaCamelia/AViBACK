class FiltresController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async editWeather(parsedQueryString) {
    const weatherValues = [
      "Temperature(F)",
      "Wind_Chill(F)",
      "Wind_Speed(mph)",
      "Humidity(%)",
      "Pressure(in)",
      "Visibility(mi)",
      "Precipitation(in)",
    ];
    const lowerValues = [
      "Temperature1",
      "Wind_Chill1",
      "Wind_Speed1",
      "Humidity1",
      "Pressure1",
      "Visibility1",
      "Precipitation1",
    ];
    const higherValues = [
      "Temperature2",
      "Wind_Chill2",
      "Wind_Speed2",
      "Humidity2",
      "Pressure2",
      "Visibility2",
      "Precipitation1",
    ];
    for (let i = 0; i < lowerValues.length; i++) {
      if (
        parsedQueryString[lowerValues[i]] &&
        parsedQueryString[higherValues[i]]
      ) {
        parsedQueryString[weatherValues[i]] = {
          $gte: parseFloat(parsedQueryString[lowerValues[i]]),
          $lte: parseFloat(parsedQueryString[higherValues[i]]),
        };
        delete parsedQueryString[lowerValues[i]];
        delete parsedQueryString[higherValues[i]];
      } else if (parsedQueryString[lowerValues[i]]) {
        parsedQueryString[weatherValues[i]] = {
          $gte: parseFloat(parsedQueryString[lowerValues[i]]),
        };
        delete parsedQueryString[lowerValues[i]];
      } else if (parsedQueryString[higherValues[i]]) {
        parsedQueryString[weatherValues[i]] = {
          $lte: parseFloat(parsedQueryString[higherValues[i]]),
        };
        delete parsedQueryString[higherValues[i]];
      }
    }
    return parsedQueryString;
  }
  async editFiltres(query) {
    if (Object.keys(query).length !== 0) {
      let parsedQueryString = query;
      if (parsedQueryString.State) {
        parsedQueryString.State = await this.database.State.getAbbrByName(
          parsedQueryString.State
        );
      }
      if (parsedQueryString.Start_Time.length > 2) {
        parsedQueryString.Start_Time = parsedQueryString.Start_Time.replace(
          "T",
          " "
        );

        parsedQueryString.Start_Time = parsedQueryString.Start_Time + ":";
        parsedQueryString.Start_Time = {
          $regex: parsedQueryString.Start_Time,
          $options: "i",
        };
      }
      parsedQueryString = await this.editWeather(parsedQueryString);
      return parsedQueryString;
    }
  }

  async createFilterDatabase() {
    try {
      const states = await this.database.Accident.getAllStatesEntities();
      for (let stateData of states) {
        this.service.locationController.createStateEntity(stateData);
      }
      const counties = await this.database.Accident.getAllCountiesEntities();
      for (let countyData of counties) {
        const stateData = await this.database.State.findOne({
          name: countyData.state,
        });
        const timezone = stateData.timezone;
        countyData.timezone = timezone;
        this.service.locationController.createCountyEntity(countyData);
      }
      const cities = await this.database.Accident.getAllCitiesEntities();
      for (let cityData of cities) {
        const countyData = await this.database.County.findOne({
          name: cityData.county,
        });
        cityData.state = countyData.state;
        cityData.timezone = countyData.timezone;
        this.service.locationController.createCityEntity(cityData);
      }
      const streets = await this.database.Accident.getAllStreetsEntities();
      for (let streetData of streets) {
        const cityData = await this.database.City.findOne({
          name: streetData.city,
        });
        streetData.county = cityData.county;
        streetData.state = cityData.state;
        streetData.timezone = cityData.timezone;
        this.service.locationController.createStreetEntity(streetData);
      }
      const content = "Database succesfully updates";
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = FiltresController;
