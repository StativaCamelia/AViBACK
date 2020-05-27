const { accidentController } = require("../../controllers/index");
const { filtresController } = require("../../controllers/index");
const { utils } = require("../../utils/index");

exports.getRes = async (req, res) => {
  const { fullPath, path, method, body, queryStringObject } = req;
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
    const auth = await utils.getAuthorization(req);
    try {
      if (auth.succes) {
        const { success, data } = await accidentController.deleteAllAccidents();
        utils.sendAnswer(success, data, res);
      } else {
        utils.sendAnswer(
          auth,
          { error: { message: "unauthorized" } },
          res,
          (statusCode = 403)
        );
      }
    } catch (error) {
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("filtres") && method === "get") {
    try {
      const { success, data } = await accidentController.createFilterDatabase();
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (
    path.endsWith("accidents") &&
    method === "get" &&
    Object.keys(queryStringObject).length === 0
  ) {
    try {
      const auth = {};
      auth.succes = true;
      if (auth.succes) {
        const { success, data } = await accidentController.getAllAccidents();
        utils.sendAnswer(success, data, res);
      } else {
        utils.sendAnswer(auth.succes, auth.data, res, (statusCode = 403));
      }
    } catch (error) {
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("accidents") && method === "post") {
    const auth = await utils.getAuthorization(req);
    try {
      if (auth) {
        const { success, data } = await accidentController.addAccident(body);
        utils.sendAnswer(success, data, res, (statusCode = 201));
      } else {
        utils.sendAnswer(
          auth,
          { error: { message: "Unauthorized" } },
          res,
          (statusCode = 403)
        );
      }
    } catch (error) {
      console.log(error);
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
    //PATCH(Update) Accident data by ID (from the original database not our ID)
  } else if (path.endsWith("accidents") && method === "patch") {
    try {
      const auth = await utils.getAuthorization(req);
      if (auth) {
        const { accidentId } = queryStringObject;
        const { success, data } = await accidentController.updateAccident({
          body,
          accidentId,
          res,
        });
        utils.sendAnswer(success, data, res);
      } else {
        utils.sendAnswer(
          auth,
          { error: { message: "unauthorized" } },
          res,
          (statusCode = 403)
        );
      }
    } catch (error) {
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
    //DELETE Accident by ID(from the original database, not our ID)
  } else if (path.endsWith("accidents") && method === "delete") {
    try {
      const auth = await utils.getAuthorization(req);
      if (auth) {
        const { accidentId } = queryStringObject;
        const { success, data } = await accidentController.deleteAccident({
          accidentId,
          res,
        });
        utils.sendAnswer(success, data, res);
      } else {
        utils.sendAnswer(
          auth,
          { error: { message: "unauthorized" } },
          res,
          (statusCode = 403)
        );
      }
    } catch (error) {
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("accidents") && method === "get") {
    try {
      const { query, type, criterion } = await filtresController.editFiltres(
        queryStringObject
      );
      const { success, data } = await accidentController.getData(
        query,
        type,
        criterion
      );
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
      utils.sendAnswer(
        false,
        { error: { message: "Internal Error" } },
        res,
        (statusCode = 501)
      );
    }
  } else if (path.endsWith("byDate") && method === "get") {
    try {
      const { success, data } = await accidentController.getDailyAccidents();
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("byDetails") && method === "get") {
    try {
      const { success, data } = await accidentController.getAccidentsDetails();
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
