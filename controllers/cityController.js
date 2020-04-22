class CityController {
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
}

module.exports = CityController;
