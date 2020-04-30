const url = require("url");
const { profileController } = require("../../controllers/index");
const verify = require("../../verifyToken");

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
    //verify(req,res,next);
    next(req, res);
  } else {
    if (fullPath.endsWith("/") && method === "post") {
      verify(req, res, next);
    }
  }
};
