const { locationController } = require("../../controllers/index");
const { utils } = require("../../utils/index");

exports.getRes = async (req, res) => {
  const { path, method, body, queryStringObject: query } = req;
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
  if (path.endsWith("/city") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getCitiesByQuery(
        payload
      );
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }

  if (path.endsWith("/county") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getCountiesByQuery(
        payload
      );
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (path.endsWith("/state") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getStateByQuery(
        payload
      );
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (path.endsWith("/street") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getStreetsByQuery(
        payload
      );
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (path.endsWith("location") && method === "get") {
    try {
      const { success, data } = await locationController.getAllLocations();
      utils.sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
