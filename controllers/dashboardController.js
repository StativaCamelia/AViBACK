const { dashboardPage } = require("../views/index");

class DashboardController {
  constructor(database) {
    this.database = database;
  }

  getDashboardPage(req, res) {
    try {
      const ids = ["", "", "active", "", ""];
      const { content, contentType } = dashboardPage.getPage(ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = DashboardController;
