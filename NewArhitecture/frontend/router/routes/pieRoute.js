const { pieController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { contentType, content } = data;
    res.writeHead(200, contentType);
    res.write(content);
    res.end();
  } else {
    const { erorr } = data;
    console.log(erorr);
    res.writeHead(401);
    res.write("Undefined");
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") && method === "get") {
    try {
      const { success, data } = await pieController.getPiePage(req, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
