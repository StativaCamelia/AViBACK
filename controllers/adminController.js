class AdminController {
  constructor(database, service) {
    this.database = database;
    this.service = service;
  }

  async createFilterDatabase() {
    try {
      const content = await this.service.filtresController.createFilterDatabase();

      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async addAccident(payload, res) {
    const content = new this.database.Accident(payload);
    try {
      await content.save();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAllAccidents(req, res) {
    try {
      const content = await this.database.Accident.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAllUsers() {
    try {
      const content = await this.database.User.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return {
        success: false,
        data: { error },
      };
    }
  }
}

module.exports = AdminController;
