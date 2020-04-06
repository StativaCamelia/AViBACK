const url = require("url");
const pug = require("pug");
const staticFileLoader = require("../staticFileLoader/index");
class HomeServices {
  constructor() {}
  renderHtml(res) {}

  getHomePage(req, res) {
    if (req.url == "/") {
      res.write(pug.renderFile("./views/home.pug", { vari: "SETTINGS" }));
      res.end();
    }
  }

  renderStaticFiles(req, res) {
    var filePath = req.url;
    console.log(contentType);
    var contentType = staticFileLoader.getContentType(req.url);
  }
}

module.exports = HomeServices;
