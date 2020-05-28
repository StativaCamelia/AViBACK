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
    const content = data;
    const response = await this.getAllUsers();
    const users = response.data.content;
    for (let user of users) {
      for (let field in content) {
        if (user.criteria !== undefined && user.valueOfCriteria !== undefined) {
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
    let message = user.validateUserRegister();
    if (message !== "") {
      return {
        success: false,
        statusCode: 400,
        contentType: "text/html",
        content: { message },
      };
    } else {
      message = await this.database.User.existEmail(user.email);
      if (message) {
        return {
          success: false,
          statusCode: 400,
          content: { message },
        };
      } else {
        message = await this.database.User.existUsername(user.username);
        if (message) {
          return {
            succes: false,
            statusCode: 400,
            content: { message },
          };
        } else {
          user.password = await user.hashPassword();
          try {
            const savedUser = await user.save();
            console.log(savedUser);
            message =
              "Succesfully registered! Please sign in and set your profile!";
            return {
              success: true,
              statusCode: 200,
              content: { message },
            };
          } catch (err) {
            console.log(err);
            message = "Undefined";
            return {
              success: false,
              statusCode: 400,
              content: { message },
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
    let message = user.validateUserLogin();
    if (message !== "") {
      return { success: false, statusCode: 400, content: { message } };
    } else {
      message = await this.database.User.existUser(
        user.username,
        user.password
      );
      if (message === "Invalid username or password!") {
        return {
          success: false,
          statusCode: 400,
          content: { message },
        };
      } else {
        try{
          const userObj = {
            token: message,
          };
          const { username } = body;
          const user = await this.database.User.findOne({ username: username });
          user.auth_tokens.push(message);
          user.save();
          return { success: true, statusCode: 200, content: { userObj } };
        }catch(error){
          return { success: false, statusCode: 400, content: error };
        }
      }
    }
  }

  async handlerGetLogin(req, res) {
    let values = {};
    if (req.headers["auth-token"]) {
      try {
        const verified = jwt.verify(
          req.headers["auth-token"],
          process.env.JWT_SECRET
        );
        const token = { auth_token: req.headers["auth-token"] };
        const isAdmin = await this.verifyAdmin(token);
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
            href: "http://localhost:5002/profile",
          };
        }
        return { success: true, statusCode: 200, content: { values } };
      } catch (err) {
        values = {
          id: "button",
          value: "LOGIN",
          href: "#",
        };
        return {
          success: false,
          statusCode: 400,
          content: { values },
        };
      }
    } else {
      values = {
        id: "button",
        value: "LOGIN",
        href: "#",
      };
      return { success: true, statusCode: 200, content: { values } };
    }
  }
  //AUTHORIZATION
  async verifyAdmin(auth_token) {
    try {
      const user = await this.database.User.findByToken(auth_token);
      if (user) {
        if (user.type === "admin") return { success: true, data: user };
        else return { success: false };
      } else return { success: false };
    } catch (error) {
      return { success: false };
    }
  }

  async getAuth(auth_token) {
    try {
      if (auth_token) {
        const content = await this.verifyAdmin(auth_token);
        if (content.success) {
          return { succes: true, data: { content } };
        } else
          return {
            succes: false,
            data: { error: { message: "Unauthorized" } },
          };
      } else {
        return { succes: false, data: { error: { message: "Unauthorized" } } };
      }
    } catch (error) {
      throw error;
    }
  }
}

module.exports = UserController;
