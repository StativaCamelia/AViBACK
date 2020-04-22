const { adminController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200);
    res.write(JSON.stringify(content, null, 2));
    res.end();
  } else {
    const { error } = data;
    console.log(error);
    res.writeHead(401);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { path, fullPath, method, body } = req;
  if (path.endsWith("/accidents/delete") && method === "delete") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("/accidents/add") && method === "post") {
    try {
      const { success, data } = await adminController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("/filtres/create") && method === "get") {
    try {
      const { success, data } = await adminController.createFilterDatabase(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
