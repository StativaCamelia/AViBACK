const staticFile = require("../staticFileLoader/index");
var zlib = require("zlib");

class StaticFilesController {
  constructor() {}

  async getRes(req, res) {
    try {
      const { success, data } = await staticFile.getStaticResource(req);
      const { content, contentType } = data;
      var acceptEncoding = req.headers["accept-encoding"];
      if (!acceptEncoding) {
        res.writeHead(200, contentType);
        res.write(content);
        res.end();
      } else if (acceptEncoding.match(/\bgzip\b/)) {
        res.writeHead(200, { "content-encoding": "gzip" });
        content.pipe(zlib.createGzip()).pipe(res);
      }
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = StaticFilesController;
