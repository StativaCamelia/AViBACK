const fs = require("mz/fs");
const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const homePageLocation = path.join(__dirname, "./index.html");

class HomePage {
  constructor() {}

  async getPage() {
    try {
      const file = await staticFileLoader.getFileContent(homePageLocation);
      const contentType = staticFileLoader.getContentType("pug");
      return { file, contentType };
    } catch (err) {
      return err;
    }
  }

  async completePage(req) {}
}

module.exports = HomePage;
