const url = require("url");
const { homeController } = require("../../controllers/index");

exports.getRes = (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") !== -1 && method === "get")
    try {
      homeController.getHomePage(req, res);
    } catch (error) {
      console.log(error);
    }
};
