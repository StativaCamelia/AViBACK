const { filtresController } = require("../../controllers/index");

function sendAnswer(statusCode,contentType,content,res) {
    res.writeHead(statusCode, {"Content-Type" : contentType});
    res.write(content);
    res.end();
}

exports.getRes = async (parsedReq, res) => {
    const { path, method } = parsedReq;
    if (path.endsWith("/") && method === "post") {
        try {
            const {statusCode, contentType, content} = await filtresController.handlerPostRequest(parsedReq, res);
            sendAnswer(statusCode, contentType, content, res);
        } catch (error) {
            console.log(error);
        }
    }
};