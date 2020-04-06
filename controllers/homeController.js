const http = require("http");
const url = require("url");
var homeService = require("../services/index");

module.exports = http.createServer((req, res) => {
  const reqUrl = url.parse(req.url, true);

  if (reqUrl.pathname == "/" && req.method === "GET") {
    homeService.getHomePage(req, res);
  }
});
