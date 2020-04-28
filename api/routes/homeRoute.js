const url = require("url");
const { homeController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { contentType, content } = data;
    res.writeHead(200, contentType);
    res.write(content);
    res.end();
  } else {
    const { erorr } = data;
    res.writeHead(401);
    res.write("Undefined");
    res.end();
  }
}

exports.getRes = (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") && method === "get") {
    try {
      const { success, data } = homeController.getHomePage(req, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};