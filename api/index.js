const url = require("url");
const { homeRoute, contactRoute } = require("./routes/index");
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
    parsedReq.body = body;
    if (parsedReq.fullPath === "/") {
      homeRoute.getRes(parsedReq, res);
      return;
    }
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
    if (parsedReq.trimmedPath.indexOf("home") !== -1) {
      homeRoute.getRes(parsedReq, res);
      return;
    }
    if (parsedReq.trimmedPath.indexOf("contact") !== -1)
      contactRoute.getRes(parsedReq, res);
    if (parsedReq.trimmedPath.indexOf("chart") !== -1)
      chartRoute.getRes(parsedReq, res);
  });
};
