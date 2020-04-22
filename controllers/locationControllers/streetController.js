class StreetController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
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
}

module.exports = StreetController;
