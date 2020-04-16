const { adminController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200);
    res.write(JSON.stringify(content, null, 2));
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
  const { path, fullPath, method, body } = req;
  if (path.endsWith("/deleteAllAccidents") && method === "delete") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("/addAccident") && method === "post") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
