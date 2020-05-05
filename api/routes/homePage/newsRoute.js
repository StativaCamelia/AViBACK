const { newsController } = require("../../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const content = data;
    res.writeHead(200, "Content-type: application/json");
    res.write(JSON.stringify({ content }, null, 2));
    res.end();
  } else {
    const { error } = data;
    console.log(error);
    res.writeHead(400);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { path, fullPath, method, body, queryStringObject: query } = req;
  if (path.endsWith("/news") && method === "get") {
    try {
      const { success, data } = await newsController.getAccidentsDetails();
      console.log(data);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
