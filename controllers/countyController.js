class CountyController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
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

  async getCountiesByState(state) {
    try {
      const query = {};
      query.state = state;
      const counties = await this.database.County.findByState(query);
      return counties;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = CountyController;
