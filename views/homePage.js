const fs = require("mz/fs");
const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const homePageLocation = path.join(__dirname, "./content.pug");

class HomePage {
  constructor() {}

  getPage() {
    try {
      const compiledFunction = pug.compileFile(homePageLocation);
      const file = compiledFunction();
      const contentType = staticFileLoader.getContentType(homePageLocation);
      return { file, contentType };
    } catch (err) {
      return err;
    }
  }

  async completePage(req) {}
}

module.exports = HomePage;
