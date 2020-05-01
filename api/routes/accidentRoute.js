const { accidentController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
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

exports.getRes = async (req, res) => {
  const { fullPath, path, method, body, queryStringObject } = req;
  //DELETE All Accidents
  if (
    path.endsWith("accident") &&
    method === "delete" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const { success, data } = await accidentController.deleteAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } //GET All Accidents
  else if (path.endsWith("filtres") && method === "get") {
    try {
      const { success, data } = await accidentController.createFilterDatabase();
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (
    path.endsWith("accident") &&
    method === "get" &&
    Object.keys(queryStringObject).length == 0
  ) {
    try {
      const { success, data } = await accidentController.getAllAccidents(
        body,
        res
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
    //POST(Create) Accident
  } else if (path.endsWith("accident") && method === "post") {
    try {
      const { success, data } = await accidentController.addAccident(body, res);
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
    //PATCH(Update) Accident data by ID (from the original database not our ID)
  } else if (path.endsWith("accident") && method === "patch") {
    try {
      const { accidentId } = queryStringObject;
      const { success, data } = await accidentController.updateAccident({
        body,
        accidentId,
        res,
      });
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
    //DELETE Accident by ID(from the original database, not our ID)
  } else if (path.endsWith("accident") && method === "delete") {
    try {
      const { accidentId } = queryStringObject;
      const { success, data } = await accidentController.deleteAccident({
        accidentId,
        res,
      });
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  } else if (path.endsWith("accident") && method === "get") {
    try {
      const { success, data } = await accidentController.getAccidentsByQuery({
        queryStringObject,
      });
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
