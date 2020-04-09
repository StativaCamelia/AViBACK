const url = require("url");
const { User } = require("../models/index");
const { homePage } = require("../views/index");
class HomeController {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  getHomePage(req, res) {
    try {
      const { file, contentType } = homePage.getPage();
      res.writeHead(200, contentType);
      res.write(file);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = HomeController;
