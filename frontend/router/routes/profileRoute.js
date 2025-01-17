const { profileController } = require("../../controllers/index");

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

function next(req, res) {
  try {
    const { success, data } = profileController.getProfilePage(req, res);
    sendAnswer(success, data, res);
  } catch (error) {
    console.log(error);
  }
}

exports.getRes = (req, parsedReq, res) => {
  const { fullPath, method, body } = parsedReq;
  if (fullPath.endsWith("/") && method === "get") {
    next(req, res);
  } else {
    if (fullPath.endsWith("/") && method === "post") {
      //verifica daca e logat
    }
  }
};
