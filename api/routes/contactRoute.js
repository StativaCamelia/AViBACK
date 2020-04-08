const url = require("url");
const { contactController } = require("../../controllers/index");

exports.getRes = (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") !== -1 && method === "get")
    contactController.getContactPage(body, res);
};
