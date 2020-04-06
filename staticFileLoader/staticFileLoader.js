const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

module.exports = class fileLoader {
  constructor(fileName) {}

  readContent(callback, file) {
    fs.readFile(file, function (err, content) {
      if (err) return callback(err);
      callback(null, content);
    });
  }

  getContentType(fileName) {
    var contentType;
    switch (path.extname(fileName)) {
      case ".js":
        contentType = "text/javascript";
        break;
      case ".css":
        contentType = "text/css";
        break;
      case ".json":
        contentType = "application/json";
        break;
      case ".png":
        contentType = "image/png";
        break;
      case ".jpg":
        contentType = "image/jpg";
        break;
      case ".wav":
        contentType = "audio/wav";
        break;
      default:
        contentType = "text/html";
    }
    return contentType;
  }
};
