const { userController } = require("../../controllers/index");

function sendAnswer(statusCode,contentType,content,res,handler) {
  if(handler === "register"){
    res.writeHead(statusCode, {"Content-Type" : contentType});
    res.write(content);
    res.end();
  }
  if(handler === "loginPost"){
    if(statusCode === 200){
      res.setHeader("auth-token",content.token);
      res.writeHead(statusCode,{"Content-Type" : contentType});
      res.write(JSON.stringify(content));
    }else{
      res.writeHead(statusCode,{"Content-Type" : contentType});
      res.write(content);
    }
    res.end();
  }
  if(handler === "loginGet"){
    res.writeHead(statusCode,{"Content-Type" : contentType});
    res.write(JSON.stringify(content));
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { fullPath, path, method, body } = req;
  if (path.endsWith("/login") && method === "post") {
    try{
      const {statusCode,contentType,content} = await userController.handlerPostLogin(req,res);
      sendAnswer(statusCode,contentType,content,res,"loginPost");
    }catch (error) {
      console.log(error)
    }
  } else {
    if (path.endsWith("/login") && method === "get") {
      try{
        const {statusCode,contentType,content} = await userController.handlerGetLogin(req,res);
        sendAnswer(statusCode,contentType,content,res,"loginGet");
      }catch(error){
        console.log(error)
      }
    }
  }
  if (path.endsWith("/register") && method === "post") {
    try {
      const {statusCode, contentType, content} = await userController.handlerPostRegister(req, res);
      sendAnswer(statusCode, contentType, content, res, "register");
    } catch (error) {
      console.log(error);
    }
  }
};
