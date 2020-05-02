const { userController } = require("../../controllers/index");
const authorization = require("../middleware/authorization");

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

function sendAnswerAPI(success, data, res, statusCode = 401) {
  if (success) {
    const { content } = data;
    res.writeHead(200);
    res.write(JSON.stringify(content, null, 2));
    res.end();
  } else {
    const { error } = data;
    res.writeHead(statusCode);
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
      } = await userController.handlerPostLogin(parsedReq, res);
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
      } = await userController.handlerPostRegister(parsedReq, res);
      sendAnswer(statusCode, contentType, content, res, "register");
    } catch (error) {
      console.log(error);
    }
  }
  if (
    path.endsWith("/user") &&
    method === "delete" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { success, data } = await userController.deleteAllUsers();
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswerAPI(
        false,
        sendAnswerAPI(
          false,
          { error: { message: "Internal Error" } },
          res,
          (statusCode = 501)
        ),
        res,
        (statusCode = 501)
      );
    }
  } else if (
    path.endsWith("user") &&
    method === "get" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { success, data } = await userController.getAllUsers();
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("user") && method === "patch")
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { userId } = queryStringObject;
        const { success, data } = await userController.updateUser({
          userId,
          body,
        });
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  else if (path.endsWith("user") && method === "delete")
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { userId } = queryStringObject;
        const { success, data } = await userController.deleteUser({
          userId,
        });
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  else if (path.endsWith("user") && method === "get")
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { userId } = queryStringObject;
        const { success, data } = await userController.getUserById({
          userId,
        });
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      console.log(error.message);
      sendAnswerAPI(
        false,
        { error: { message: "Internal error" } },
        res,
        (statusCode = 501)
      );
    }
  else if (path.endsWith("user") && method === "post")
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { userId } = queryStringObject;
        const { success, data } = await userController.createUser({
          userId,
          body,
        });
        sendAnswerAPI(success, data, res);
      } else {
        sendAnswerAPI(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      console.log(error.message);
      sendAnswerAPI(
        false,
        { error: { message: "Internal error" } },
        res,
        (statusCode = 501)
      );
    }
};
