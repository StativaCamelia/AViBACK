const { userController } = require("../../controllers/index");

function sendAnswer(statusCode, contentType, content, res, handler) {
  if (handler === "register") {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.write(content);
    res.end();
  }
  if (handler === "loginPost") {
    if (statusCode === 200) {
      res.setHeader("auth-token", content.token);
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.write(JSON.stringify(content));
    } else {
      res.writeHead(statusCode, { "Content-Type": contentType });
      res.write(content);
    }
    res.end();
  }
  if (handler === "loginGet") {
    res.writeHead(statusCode, { "Content-Type": contentType });
    res.write(JSON.stringify(content));
    res.end();
  }
}

function sendAnswerAPI(success, data, res, statusCode = 200) {
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

exports.getRes = async (req, parsedReq, res) => {
  const { path, method, queryStringObject, body } = parsedReq;
  if (path.endsWith("/login") && method === "post") {
    try {
      const {
        statusCode,
        contentType,
        content,
      } = await userController.handlerPostLogin(req, res);
      sendAnswer(statusCode, contentType, content, res, "loginPost");
    } catch (error) {
      console.log(error);
    }
  } else {
    if (path.endsWith("/login") && method === "get") {
      try {
        const {
          statusCode,
          contentType,
          content,
        } = await userController.handlerGetLogin(req, res);
        sendAnswer(statusCode, contentType, content, res, "loginGet");
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (path.endsWith("/register") && method === "post") {
    try {
      const {
        statusCode,
        contentType,
        content,
      } = await userController.handlerPostRegister(req, res);
      sendAnswer(statusCode, contentType, content, res, "register");
    } catch (error) {
      console.log(error);
    }
  }
  if (
    path.endsWith("user") &&
    method === "delete" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const { success, data } = await userController.deleteAllUsers();
      sendAnswerAPI(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (
    path.endsWith("user") &&
    method === "get" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const { success, data } = await userController.getAllUsers();
      sendAnswerAPI(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("user") && method === "patch") {
    try {
      const { userId } = queryStringObject;
      const { success, data } = await userController.updateUser({
        body,
        userId,
        res,
      });
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
    //DELETE Accident by ID(from the original database, not our ID)
  }
};
