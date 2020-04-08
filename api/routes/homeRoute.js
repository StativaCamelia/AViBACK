const url = require("url");
const { homeController } = require("../../controllers/index");

exports.getRes = (req, res) => {
  const { trimmedPath, method, body } = req;
  if (trimmedPath.indexOf("api") !== -1 && method === "get")
    homeController.getHomePage(body, res);
};
