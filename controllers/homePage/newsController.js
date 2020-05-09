class NewsController {
  constructor(database, services) {
    this.database = database;
    this.services = services;
  }

  async getAccidentsDetails() {
    try {
      const details = await this.database.Accident.getAccidentDetails();
      return { success: true, data: { details } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = NewsController;
