const staticFile = require("../../staticFileLoader/index");
class StaticFilesControler {
  constructor() {}

  async getRes(req, res) {
    try {
      const { success, data } = await staticFile.getStaticResource(req);
      const { content, contentType } = data;
      res.writeHead(200, contentType);
      res.write(content);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = StaticFilesControler;