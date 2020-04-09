const url = require("url");
const { User } = require("../models/index");
const { homePage } = require("../views/index");
class HomeController {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  async getHomePage(req, res) {
    try {
      const { file, contentType } = await homePage.getPage();
      res.writeHead(200, contentType);
      res.write(file);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = HomeController;
