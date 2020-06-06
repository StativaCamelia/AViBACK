const { userController } = require("../../controllers/index");
const checkForObjectId = /^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i;

function sendAnswer(success, statusCode, content, res, handler) {
  if (handler === "register" || handler === "loginGet") {
    res.writeHead(statusCode, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    });
    res.write(JSON.stringify({ content }, null, 2));
    res.end();
  } else {
    if (handler === "loginPost") {
      if (statusCode === 200) {
        res.setHeader("auth-token", content.userObj.token);
      }
      res.writeHead(statusCode, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "POST, GET, OPTIONS, PATCH, PUT, DELETE",
        "Access-Control-Allow-Headers": "auth-token, Content-Type",
      });
      res.write(JSON.stringify({ content }, null, 2));
      res.end();
    }
  }
}

function sendAnswerAPI(success, data, res, statusCode = 401) {
  if (success) {
    const { content } = data;
    res.writeHead(statusCode, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    });
    res.write(JSON.stringify({ content }, null, 2));
    res.end();
  } else {
    const { error } = data;
    res.writeHead(statusCode);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, parsedReq, res) => {
  const { path, method, queryStringObject, body, headers } = parsedReq;
  if (method === "options") {
    res.writeHead(200, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Request-Headers": "X-PINGOTHER, Content-Type",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    });
    res.end();
    return;
  }
  if (path.endsWith("/login") && method === "post") {
    try {
      const {
        success,
        statusCode,
        content,
      } = await userController.handlerPostLogin(parsedReq, res);
      sendAnswer(success, statusCode, content, res, "loginPost");
    } catch (error) {
      console.log(error);
    }
  } else {
    if (path.endsWith("/login") && method === "get") {
      try {
        const {
          success,
          statusCode,
          content,
        } = await userController.handlerGetLogin(req, res);
        sendAnswer(success, statusCode, content, res, "loginGet");
      } catch (error) {
        console.log(error);
      }
    }
  }
  if (path.endsWith("/register") && method === "post") {
    try {
      const {
        success,
        statusCode,
        content,
      } = await userController.handlerPostRegister(parsedReq, res);
      sendAnswer(success, statusCode, content, res, "register");
    } catch (error) {
      console.log(error);
    }
  }
  if (
    path.endsWith("/users") &&
    method === "delete" &&
    Object.keys(queryStringObject).length === 0
  ) {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const { success, data } = await userController.deleteAllUsers();
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
    path.endsWith("/users") &&
    method === "get" &&
    Object.keys(queryStringObject).length === 0
  ) {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);

      if (auth.succes) {
        const { success, data } = await userController.getAllUsers();
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
  } else if (
    checkForObjectId.test(path.substring(path.lastIndexOf("/") + 1)) &&
    method === "put"
  ) {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const userId = path.substring(path.lastIndexOf("/") + 1);
        const { success, data } = await userController.updateUser({
          userId,
          body,
        });
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
  } else if (
    checkForObjectId.test(path.substring(path.lastIndexOf("/") + 1)) &&
    method === "delete"
  ) {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const userId = path.substring(path.lastIndexOf("/") + 1);
        const { success, data } = await userController.deleteUser({
          userId,
        });
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
  } else if (path.endsWith("/users") && method === "get") {
    try {
      const { token } = parsedReq.queryStringObject;
      const { success, data } = await userController.getUserByToken(token);
      sendAnswerAPI(success, data, res, (statusCode = 200));
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (
    checkForObjectId.test(path.substring(path.lastIndexOf("/") + 1)) &&
    method === "get"
  ) {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const userId = path.substring(path.lastIndexOf("/") + 1);
        const { success, data } = await userController.getUserById({
          userId,
        });
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
  } else if (path.endsWith("authorization") && method === "get") {
    try {
      const { succes, data } = await userController.getAuth(
        queryStringObject.token
      );
      if (succes === true) sendAnswerAPI(succes, data, res, (statusCode = 200));
      else sendAnswerAPI(succes, data, res, (statusCode = 403));
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: error.message } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("send-email") && method === "get") {
    try {
      const { succes, data } = await userController.getIntrestedUsers(
        queryStringObject
      );
      if (succes === true) sendAnswerAPI(succes, data, res, (statusCode = 200));
      else sendAnswerAPI(succes, data, res, (statusCode = 403));
    } catch (error) {
      sendAnswerAPI(
        false,
        { error: { message: error.message } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("/users") && method === "post") {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const { userId } = queryStringObject;
        const { success, data } = await userController.createUser({
          userId,
          body,
        });
        sendAnswerAPI(success, data, res, (statusCode = 201));
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
  } else if (path.endsWith("/confirm") && method === "get") {
    try {
      const { token } = parsedReq.queryStringObject;
      const { success, data } = await userController.confirmEmail(token);
      res.writeHead(301, {
        Location: "http://localhost:5002/home",
      });
      return res.end();
    } catch (error) {
      console.log(error.message);
      sendAnswerAPI(
        false,
        { error: { message: "Internal error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("/general") && method === "get") {
    try {
      const auth = await userController.getAuth(req.headers["auth-token"]);
      if (auth.succes) {
        const { success, data } = await userController.getUsersGeneralDetails();
        sendAnswerAPI(success, data, res, (statusCode = 200));
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
  }
};
