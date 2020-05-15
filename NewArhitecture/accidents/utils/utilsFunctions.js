const fetch = require("node-fetch");

class Utils {
  constructor() {}
  sendAnswer(success, data, res, statusCode = 200) {
    if (success) {
      const { content } = data;
      res.writeHead(200, {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "POST, GET, OPTIONS, PATCH, PUT, DELETE",
        "Access-Control-Allow-Headers": "auth-token, Content-Type",
      });
      res.write(JSON.stringify({ content }, null, 2));
      res.end();
    } else {
      const { error } = data;
      console.log(error);
      res.writeHead(401);
      res.write(error.message);
      res.end();
    }
  }

  async getAuthorization(req) {
    try {
      const auth_token = req.headers["auth-token"];
      let result = await fetch(
        "http://localhost:5003/user/authorization?token=" + auth_token,
        {
          method: "get",
        }
      );
      if (result.status === 200) return true;
      else return false;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = Utils;
