const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const mapPageLocation = path.join(__dirname, "./components/mapPageContent.pug");

class MapPage {
  constructor() {}

  getMapPage() {
    try {
      const compiledFunction = pug.compileFile(mapPageLocation);
      const content = compiledFunction();
      const contentType = staticFileLoader.getContentType(mapPageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = MapPage;
