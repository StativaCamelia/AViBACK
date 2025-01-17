const pathUtils = require("path");
const fs = require("mz/fs");

class StaticFileLoader {
  constructor() {}

  async getFileContent(file) {
    try {
      const data = fs.createReadStream(file);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getStaticResource(req) {
    try {
      let { path } = req;
      if (
        path.indexOf("/dashboard") !== -1 &&
        (path.indexOf("/dashboard_calls") === -1 ||
          path.indexOf("/dashboard_calls") === 18)
      ) {
        path = path.substring(10);
      }
      const filePath = pathUtils.join(__dirname, "public", path);
      const content = await this.getFileContent(filePath);
      const contentType = this.getContentType(path);

      return { success: true, data: { content, contentType } };
    } catch (error) {
      return { success: false, data: { erorr } };
    }
  }

  getContentType(fileName) {
    var contentType;
    switch (pathUtils.extname(fileName)) {
      case ".js":
        contentType = { "Content-Type": "text/javascript" };
        break;
      case ".css":
        contentType = { "Content-Type": "text/css" };
        break;
      case ".json":
        contentType = { "Content-Type": "application/json" };
        break;
      case ".png":
        contentType = { "Content-Type": "image/png" };
        break;
      case ".jpg":
        contentType = { "Content-Type": "image/jpg" };
        break;
      case ".wav":
        contentType = { "Content-Type": "audio/wav" };
        break;
      default:
        contentType = { "Content-Type": "text/html" };
    }
    return contentType;
  }
}

module.exports = StaticFileLoader;
