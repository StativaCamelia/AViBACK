const fs = require("mz/fs");
const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const homePageLocation = path.join(
  __dirname,
  "./components/mainPageContent.pug"
);

class HomePage {
  constructor() {}

  getPage() {
    try {
      const compiledFunction = pug.compileFile(homePageLocation);
      const content = compiledFunction();
      const contentType = staticFileLoader.getContentType(homePageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = HomePage;
