const { locationController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200, "Content-type: application/json");
    res.write(JSON.stringify({ content }, null, 2));
    res.end();
  } else {
    const { error } = data;
    console.log(error);
    res.writeHead(400);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { path, fullPath, method, body, queryStringObject: query } = req;

  if (path.endsWith("/city") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getCitiesByQuery(
        payload
      );
      sendAnswer(success, data, res);
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
      sendAnswer(success, data, res);
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
      sendAnswer(success, data, res);
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
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
  if (path.endsWith("location") && method === "get") {
    try {
      const payload = { body, query };
      const { success, data } = await locationController.getAllLocations(
        payload
      );
      sendAnswer(success, data, res);
    } catch (error) {
      console.log(error);
    }
  }
};
