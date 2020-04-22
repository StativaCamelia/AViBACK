const { stateController } = require("../../controllers/index");

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
  const { path, fullPath, method, body, queryStringObject: query } = req;
  if (path.endsWith("/states") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await stateController.getStates(payload, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
