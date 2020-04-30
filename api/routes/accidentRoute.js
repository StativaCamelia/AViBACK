const { accidentController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200);
    res.write(JSON.stringify(content, null, 2));
    res.end();
  } else {
    const { error } = data;
    console.log(error);
    console.log(error);
    res.writeHead(401);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { fullPath, path, method, body } = req;
  if (path.endsWith("accident/") && method === "delete") {
    try {
      const { success, data } = await accidentController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("accident/") && method === "get") {
    try {
      const { success, data } = await accidentController.getAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("accident/" && method === "post")) {
    try {
      const { success, data } = await accidentController.addAccident(body, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
