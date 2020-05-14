const { accidentController } = require("../../controllers/index");
const { filtresController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    });
    res.write(JSON.stringify({ content }, null, 2));
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
  const { fullPath, path, method, body, queryStringObject } = req;
  //DELETE All Accidents
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
  if (
    path.endsWith("accidents") &&
    method === "delete" &&
    Object.keys(queryStringObject).length === 0
  ) {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { success, data } = await accidentController.deleteAllAccidents();
        sendAnswer(success, data, res);
      } else {
        sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("filtres") && method === "get") {
    try {
      const { success, data } = await accidentController.createFilterDatabase();
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (
    path.endsWith("accidents") &&
    method === "get" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { success, data } = await accidentController.getAllAccidents();
        sendAnswer(success, data, res);
      } else {
        sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
    //POST(Create) Accident
  } else if (
    path.endsWith("accidents") &&
    method === "post" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { success, data } = await accidentController.addAccident(body);
        sendAnswer(success, data, res, (statusCode = 201));
      } else {
        sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
    //PATCH(Update) Accident data by ID (from the original database not our ID)
  } else if (path.endsWith("accidents") && method === "patch") {
    try {
      const auth = await authorization.getAuth(req);
      if (auth.succes) {
        const { accidentId } = queryStringObject;
        const { success, data } = await accidentController.updateAccident({
          body,
          accidentId,
          res,
        });
        sendAnswer(success, data, res);
      } else {
        sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
    //DELETE Accident by ID(from the original database, not our ID)
  } else if (path.endsWith("accidents") && method === "delete") {
    try {
      if (auth.succes) {
        const { accidentId } = queryStringObject;
        const { success, data } = await accidentController.deleteAccident({
          accidentId,
          res,
        });
        sendAnswer(success, data, res);
      } else {
        sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("accidents") && method === "get") {
    try {
      console.log(queryStringObject);
      const query = await filtresController.editFiltres(queryStringObject);
      console.log(query);
      const { success, data } = await accidentController.getData({
        query,
      });
      sendAnswer(success, data, res);
    } catch (error) {
      sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("byDate") && method === "get") {
    try {
      const { success, data } = await accidentController.getDailyAccidents();
      console.log(data);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("byDetails") && method === "get") {
    try {
      const { success, data } = await accidentController.getAccidentsDetails();
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
