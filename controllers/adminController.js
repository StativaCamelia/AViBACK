class AdminController {
  constructor(database) {
    this.database = database;
  }

  async addAccident(payload, res) {
    const content = new this.database.Accident(payload);
    try {
      await content.save();
      return { success: true, data: { content } };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }

  async deleteAllAccidents(req, res) {
    try {
      const content = await this.database.Accident.deleteMany({});
      return { success: true, data: { content } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }

  async deleteAllUsers() {
    try {
      const content = await this.database.User.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return {
        success: false,
        error: { message: error.message },
      };
    }
  }
}

module.exports = AdminController;
