const url = require("url");
const staticFileLoader = require("../staticFileLoader/index");

class HomeController {
  constructor() {}

  getHomePage(req, res) {
    console.log(req);
  }
}

module.exports = HomeController;
