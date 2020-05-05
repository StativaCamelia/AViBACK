const url = require("url");
const { User } = require("../../models/index");
const { homePage } = require("../../views/index");

class HomeController {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  getHomePage(req, res) {
    try {
      const ids = ["active", "", "", "", ""];
      const { content, contentType } = homePage.getPage(ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = HomeController;
