class FiltresController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async createFilterDatabase() {
    try {
      const states = await this.database.Accident.getAllStatesEntities();
      for (let stateData of states) {
        this.createStateEntity(stateData);
      }
      const counties = await this.database.Accident.getAllCountiesEntities();
      for (let countyData of counties) {
        this.createCountyEntity(countyData);
      }
      const cities = await this.database.Accident.getAllCitiesEntities();
      for (let cityData of cities) {
        this.createCityEntity(cityData);
      }
      const streets = await this.database.Accident.getAllStreetsEntities();
      for (let streetData of streets) {
        this.createStreetEntity(streetData);
      }
      const content = "Succes";
      return content;
    } catch (error) {
      throw error;
    }
  }

  async createCityEntity(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const content = await this.database.City.findOneAndUpdate(
        { name: payload.name },
        payload,
        options
      );

      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async createStreetEntity(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const content = await this.database.Street.findOneAndUpdate(
        { name: payload.name },
        payload,
        options
      );

      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async createCountyEntity(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const content = await this.database.County.findOneAndUpdate(
        { name: payload.name },
        payload,
        options
      );

      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async createStateEntity(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const content = await this.database.State.findOneAndUpdate(
        { name: payload.name },
        payload,
        options
      );
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = FiltresController;
