const url = require("url");
const { userRoute } = require("./routes/index");

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

    if (parsedReq.path.indexOf("users") !== -1) {
      userRoute.getRes(req, parsedReq, res);
      return;
    }
  });
};
