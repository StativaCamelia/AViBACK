const fetch = require("node-fetch");
const math = require("mathjs");
class Utils {
  constructor() {}

  static get corsHeader() {
    return {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS, PATCH, PUT, DELETE",
      "Access-Control-Allow-Headers": "auth-token, Content-Type",
    };
  }

  sendAnswer(success, data, res, statusCode = 200) {
    if (success) {
      const { content } = data;
      res.writeHead(200, Utils.corsHeader);
      res.write(JSON.stringify({ content }, null, 2));
      res.end();
    } else {
      const { error } = data;
      console.log(error);
      res.writeHead(401, Utils.corsHeader);
      res.write(error.message);
      res.end();
    }
  }

  async sendEmail(content) {
    const { payload: query } = content;
    delete query._id;
    delete query._v;
    let queryString = this.getQueryStringFromObject(query);
    try {
      let result = await fetch(
        `http://localhost:5003/user/send-email?${queryString}`,
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

  getQueryStringFromObject(object) {
    let queryString = "";
    for (let field in object) {
      queryString = this.concatQueryString(queryString, field, object[field]);
    }
    return queryString.substr(1);
  }

  concatQueryString(queryString, key, value) {
    queryString = queryString + "&";
    queryString = queryString + key + "=" + value;
    return queryString;
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

  getBoudaries(content) {
    let value = content.map((element) => element.count);
    if (value.length > 0)
      return {
        first: [0, math.quantileSeq(value, 0.25)],
        second: [math.quantileSeq(value, 0.25), math.median(value)],
        third: [math.median(value), math.quantileSeq(value, 0.75)],
        fourth: [math.quantileSeq(value, 0.75), math.max(value)],
      };
    else
      return { first: [0, 0], second: [0, 0], third: [0, 0], fourth: [0, 0] };
  }
}

module.exports = Utils;
