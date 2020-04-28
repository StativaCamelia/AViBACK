//controller for ajax call to set the counter number
//look at locationControllers  for example
class CounterController {
  constructor(database, services) {
    this.database = database;
    this.services = services;
  }

  async getDailyAccidents() {
    try {
      const number = await this.database.Accident.methods.getNumberOfAccidents();
      return { success: true, data: { number } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = CounterController;
