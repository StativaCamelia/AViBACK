const url = require("url");
const {
  dashboardRoute,
  homeRoute,
  contactRoute,
  mapRoute,
  pieRoute,
  profileRoute,
  chartRoute,
} = require("./routes/index");
const { staticFilesController } = require("../controllers/index");

exports.getRes = async (req, res) => {
  const parsedReq = {};
  parsedReq.parsedUrl = url.parse(req.url, true);
  parsedReq.path = parsedReq.parsedUrl.pathname;
  parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\/+$/g, "");
  parsedReq.fullPath =
    parsedReq.trimmedPath.substring(0, parsedReq.path.indexOf("/")) + "/";
  parsedReq.method = req.method.toLowerCase();
  parsedReq.headers = req.headers;
  parsedReq.user = req.user;

  parsedReq.queryStringObject = JSON.parse(
    JSON.stringify(parsedReq.parsedUrl.query)
  );

  let body = [];
  req.on("data", (chunk) => {
    body.push(chunk);
  });

  req.on("end", () => {
    body = Buffer.concat(body).toString();
    if (body) parsedReq.body = JSON.parse(body);
    if (
      parsedReq.path.includes(".png") ||
      parsedReq.path.includes(".css") ||
      parsedReq.path.includes(".js") ||
      parsedReq.path.includes(".jpg")
    ) {
      try {
        console.log(parsedReq.path);
        staticFilesController.getRes(parsedReq, res);
        return;
      } catch (error) {
        return;
      }
    }

    if (parsedReq.path.indexOf("home") !== -1) {
      console.log(parsedReq.path);
      homeRoute.getRes(parsedReq, res);
      return;
    }

    if (parsedReq.path.indexOf("contact") !== -1) {
      contactRoute.getRes(parsedReq, res);
      return;
    }
    if (parsedReq.path.indexOf("map") !== -1) {
      mapRoute.getRes(parsedReq, res);
      return;
    }
    if (parsedReq.path.indexOf("pie") !== -1) {
      pieRoute.getRes(parsedReq, res);
      return;
    }

    if (parsedReq.path.indexOf("chart") !== -1) {
      chartRoute.getRes(parsedReq, res);
      return;
    }
    // if (parsedReq.path.indexOf("profile") !== -1) {
    //   profileRoute.getRes(req, parsedReq, res);
    //   return;
    // }
    if (parsedReq.path.indexOf("dashboard") !== -1) {
      dashboardRoute.getRes(parsedReq, res);
      return;
    }
  });
};
