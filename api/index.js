const url = require("url");
const {
  homeRoute,
  contactRoute,
  adminRoute,
  mapRoute,
} = require("./routes/index");
const { staticFilesController } = require("../controllers/index");
exports.getRes = async (req, res) => {
  const parsedReq = {};

  parsedReq.parsedUrl = url.parse(req.url, true);
  parsedReq.path = parsedReq.parsedUrl.pathname;
  parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\/+$/g, "");
  parsedReq.fullPath =
    parsedReq.trimmedPath.substring(0, parsedReq.trimmedPath.indexOf("/")) +
    "/";
  parsedReq.method = req.method.toLowerCase();
  parsedReq.headers = req.headers;
  parsedReq.queryStringObject = parsedReq.parsedUrl.query;

  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", async () => {
    body = Buffer.concat(body).toString();
    if (body) parsedReq.body = JSON.parse(body);
    if (
      parsedReq.path.includes(".png") ||
      parsedReq.path.includes(".css") ||
      parsedReq.path.includes(".js") ||
      parsedReq.path.includes(".jpg")
    ) {
      try {
        await staticFilesController.getRes(parsedReq, res);
        return;
      } catch (error) {
        console.log(error);
        return;
      }
    }
    if (parsedReq.path.indexOf("home") !== -1) {
      homeRoute.getRes(parsedReq, res);
      return;
    }

    if (parsedReq.path.indexOf("contact") !== -1) {
      contactRoute.getRes(parsedReq, res);
      return;
    }

    if (parsedReq.path.indexOf("admin") !== -1) {
      await adminRoute.getRes(parsedReq, res);
      return;
    }

    if (parsedReq.path.indexOf("map") !== -1) {
      await mapRoute.getRes(parsedReq, res);
    }
  });
};
