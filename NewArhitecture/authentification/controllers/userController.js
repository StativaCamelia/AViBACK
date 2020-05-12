const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  secure: true,
  auth: {
    user: "andreiagronom1@gmail.com",
    pass: "Alfabet1.",
  },
});

class UserController {
  constructor(database) {
    this.database = database;
  }
  async getIntrestedUsers(data) {
    const { content } = data;
    const response = await this.getAllUsers();
    const users = response.data.content;
    for (let user of users) {
      for (let field in content) {
        if (user.criteria != undefined && user.valueOfCriteria != undefined) {
          if (user.criteria === field)
            if (user.valueOfCriteria === content[field]) {
              const objectOfInterest = content[field];
              const email = user.email;
              this.sendMail({ field, objectOfInterest, email });
            }
        }
      }
    }
  }

  async sendMail(data) {
    const { email, field, objectOfInterest } = data;
    var mailOptions = {
      from: "andreiagronom1@gmail.com",
      to: email,
      subject: "AVI: Online services for data visualization",
      text:
        "New data was added on a area you are interested in " +
        field +
        ":" +
        objectOfInterest,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
      }
    });
  }

  async createUser(data) {
    const { userId, body: userContent } = data;
    try {
      const content = new this.database.User(userContent);
      await content.save();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getUserById(data) {
    const { userId } = data;
    try {
      const content = await this.database.User.findOne({
        _id: mongoose.Types.ObjectId(userId),
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteUser(data) {
    const { userId } = data;
    try {
      const content = await this.database.User.findOneAndDelete({
        _id: mongoose.Types.ObjectId(userId),
      });
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async verifyAdmin(token) {
    const { auth_token } = token;
    try {
      const user = await this.database.User.findByToken(auth_token);
      if (user) {
        if (user.type === "admin") return { success: true };
        else return { success: false };
      } else return { success: false };
    } catch (error) {
      return { success: false };
    }
  }

  async updateUser(payload) {
    try {
      const options = {
        upsert: true,
        new: true,
        useFindAndModify: false,
      };
      const { userId, body: newContent } = payload;
      const content = await this.database.User.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(userId),
        },
        newContent,
        options
      );
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
      for (let user of content) {
        user._id = undefined;
        user.password = undefined;
        user._v = undefined;
        user.auth_tokens = undefined;
      }
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
      if (existedUser === "Invalid username or password!") {
        return {
          statusCode: 400,
          contentType: "text/html",
          content: existedUser,
        };
      } else {
        const userObj = {
          token: existedUser,
        };
        const { username } = body;
        const user = await this.database.User.findOne({ username: username });
        user.auth_tokens.push(existedUser);
        user.save();
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
        const token = { auth_token: req.headers["auth-token"] };
        const isAdmin = await this.verifyAdmin(token);
        let values = {};
        if (isAdmin.success) {
          values = {
            id: "dashboard",
            value: "DASHBOARD",
            href: "http://localhost:5001/dashboard",
          };
        } else {
          values = {
            id: "profile",
            value: "MY PROFILE",
            href: "http://localhost:5001/profile",
          };
        }
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
      return { statusCode: 200, contentType: "text/html", content: valuesLog };
    }
  }
}

module.exports = UserController;