class LocationController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
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

  async getCitiesByQuery(payload) {
    try {
      const { query } = payload;
      const content = await this.database.City.findByQuery({ query });
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

  async getCountiesByQuery(payload) {
    try {
      const { query } = payload;
      const content = await this.database.County.findByQuery({ query });
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
  async getStateByQuery(payload) {
    try {
      const { query } = payload;
      const content = await this.database.State.findByQuery({ query });
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

  async getStreetsByQuery(payload) {
    try {
      const { query } = payload;
      const content = await this.database.Street.findByQuery({ query });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAllLocations() {
    try {
      const statesValues = await this.database.State.getAllStatesViews();
      const countiesValues = await this.database.County.getAllCountiesViews({});
      const citiesValues = await this.database.City.getAllCitiesViews({});
      const streetsValues = await this.database.Street.getAllStreetsViews({});
      const timezoneValues = await this.database.State.getAllTimezones();
      const content = {
        statesValues,
        countiesValues,
        citiesValues,
        streetsValues,
        timezoneValues,
      };
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = LocationController;
