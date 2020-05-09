const pathUtils = require("path");
const fs = require("mz/fs");

class StaticFileLoader {
  constructor() {}

  async getFileContent(file) {
    try {
      const data = await fs.readFile(file);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getStaticResource(req) {
    try {
      const { path } = req;
      const filePath = pathUtils.join(__dirname, "public", path);
      console.log(filePath);
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