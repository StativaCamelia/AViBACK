class StateController {
  constructor(database, services) {
    this.database = database;
    this.services = services;
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
}

module.exports = StateController;
