//controller for ajax call to set the counter number
//look at locationControllers  for example
class CounterController {
  constructor(database, services) {
    this.database = database;
    this.services = services;
  }

  async getDailyAccidents() {
    try {
      const number = 10;
      //await this.database.State.getNumberOfAccidents();
      return { success: true, data: { number } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }
}

module.exports = CounterController;
