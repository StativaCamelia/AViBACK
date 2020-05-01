const jwt = require("jsonwebtoken");

class UserController {
  constructor(database) {
    this.database = database;
  }
  async updateUser(payload) {
    try {
      const { userId, body: newContent } = payload;

      const content = await this.database.User.find({
        username: pufuletipixelati,
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAllUsers(req, res) {
    try {
      const content = await this.database.User.deleteMany({});
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAllUsers() {
    try {
      const content = await this.database.User.find({});
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async handlerPostRegister(req, res) {
    const { body } = req;
    let user = new this.database.User({
      email: body.email,
      username: body.username,
      password: body.password,
    });
    const message = user.validateUserRegister();
    if (message !== "") {
      return { statusCode: 400, contentType: "text/html", content: message };
    } else {
      const existedEmail = await this.database.User.existEmail(user.email);
      if (existedEmail) {
        return {
          statusCode: 400,
          contentType: "text/html",
          content: existedEmail,
        };
      } else {
        const existedUsername = await this.database.User.existUsername(
          user.username
        );
        if (existedUsername) {
          return {
            statusCode: 400,
            contentType: "text/html",
            content: existedUsername,
          };
        } else {
          user.password = await user.hashPassword();
          try {
            const savedUser = await user.save();
            const registerResponse =
              "Succesfully registered! Please sign in and set your profile!";
            return {
              statusCode: 200,
              contentType: "text/html",
              content: registerResponse,
            };
          } catch (err) {
            const registerErr = "Undefined";
            return {
              statusCode: 401,
              contentType: "text/html",
              content: registerErr,
            };
          }
        }
      }
    }
  }

  async handlerPostLogin(req, res) {
    const { body } = req;
    let user = new this.database.User({
      username: body.username,
      password: body.password,
    });
    const message = user.validateUserLogin();
    if (message !== "") {
      return { statusCode: 400, contentType: "text/html", content: message };
    } else {
      const existedUser = await this.database.User.existUser(
        user.username,
        user.password
      );
      if (
        existedUser === "Invalid username!" ||
        existedUser === "Invalid password!"
      ) {
        return {
          statusCode: 400,
          contentType: "text/html",
          content: existedUser,
        };
      } else {
        const userObj = {
          token: existedUser,
        };
        return { statusCode: 200, contentType: "text/html", content: userObj };
      }
    }
  }

  async handlerGetLogin(req, res) {
    if (req.headers["auth-token"]) {
      try {
        const verified = jwt.verify(
          req.headers["auth-token"],
          process.env.JWT_SECRET
        );
        req.user = verified;
        const values = {
          id: "profile",
          value: "MY PROFILE",
          href: "http://localhost:5001/profile",
        };
        return { statusCode: 200, contentType: "text/html", content: values };
      } catch (err) {
        const valuesLog = {
          id: "button",
          value: "LOGIN",
          href: "#",
        };
        return {
          statusCode: 400,
          contentType: "text/html",
          content: valuesLog,
        };
      }
    } else {
      const valuesLog = {
        id: "button",
        value: "LOGIN",
        href: "#",
      };
      return { statusCode: 401, contentType: "text/html", content: valuesLog };
    }
  }
}

module.exports = UserController;
