const staticFile = require("../staticFileLoader/index");
class StaticFilesControler {
  constructor() {}

  async getRes(req, res) {
    try {
      const { file, contentType } = await staticFile.getStaticResource(req);
      res.writeHead(200, contentType);
      res.write(file);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = StaticFilesControler;
