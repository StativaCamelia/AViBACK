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
  tls: {
    rejectUnauthorized: false
  }
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
      from: process.env.email,
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
      }
    });
  }

  async sendConfirmationEmail(user) {
    const { email: emailTo, _id: userId } = user;
    var emailToken = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    var url = `http://localhost:5003/users/confirm?token=${emailToken}`;
    var mailOptions = {
      from: process.env.email,
      to: emailTo,
      subject: "Avi: Confirm Email",
      html: `Please click this email to confirm your email: <a href="${url}">${url}</a>`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
    });
  }

  async confirmEmail(token) {
    try {
      const userId = jwt.verify(token, process.env.JWT_SECRET)._id;
      const content = await this.database.User.findOneAndUpdate(
        { _id: userId },
        { confirmed: true }
      );
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async createUser(data) {
    const { userId, body: userContent } = data;
    try {
      const content = new this.database.User(userContent);
      content.password = await content.hashPassword();
      await content.save();
      const log = new this.database.UsersLog({
        method: "create",
        date: new Date(),
      });
      await log.save();
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
      const log = new this.database.UsersLog({
        method: "delete",
        date: new Date(),
      });
      await log.save();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async updateUser(payload) {
    try {
      const { userId, body: newContent } = payload;
      const content = await this.database.User.findOneAndUpdate(
        {
          _id: userId,
        },
        newContent
      );
      const log = new this.database.UsersLog({
        method: "update",
        date: new Date(),
      });
      await log.save();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async deleteAllUsers(req, res) {
    try {
      const content = await this.database.User.deleteMany({ type: "user" });
      const usersDeleted = content.deletedCount;
      for (let i = 0; i < usersDeleted; i++) {
        const log = new this.database.UsersLog({
          method: "delete",
          date: new Date(),
        });
        await log.save();
      }
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getUsersNumber() {
    try {
      const content = await this.database.User.find({}).countDocuments();
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getUsersGeneralDetails() {
    try {
      let content = {};
      const usersNumber = await this.getUsersNumber();
      const newUsers = await this.database.UsersLog.findByMethod("create");
      const deletedUsers = await this.database.UsersLog.findByMethod("delete");
      const updatedUsers = await this.database.UsersLog.findByMethod("update");

      content.usersNumber = usersNumber.data.content;
      content.newUsersNumber = newUsers;
      content.deletedUsersNumber = deletedUsers;
      content.updatedUsersNumber = updatedUsers;
      return { success: true, data: { content } };
    } catch (error) {
      return { success: false, data: { error } };
    }
  }

  async getAllUsers() {
    try {
      const content = await this.database.User.find({});
      for (let user of content) {
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
      type: body.type,
      confirmed: false,
    });
    if(user.type === "admin"){
      user.confirmed = true;
    }
    let message = user.validateUserRegister();
    if (message !== "") {
      return {
        success: false,
        statusCode: 400,
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
            success: false,
            statusCode: 400,
            content: { message },
          };
        } else {
          user.password = await user.hashPassword();
          try {
            await user.save();
            this.sendConfirmationEmail(user);
            const log = new this.database.UsersLog({
              method: "create",
              date: new Date(),
            });
            await log.save();
            message =
              "Successfully registered! Please  confirm your email, sign in and set your profile!";
            return {
              success: true,
              statusCode: 201,
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
      if (
        message === "Invalid username or password!" ||
        message === "Please confirm your email"
      ) {
        return {
          success: false,
          statusCode: 400,
          content: { message },
        };
      } else {
        try {
          const userObj = {
            token: message,
          };
          return { success: true, statusCode: 200, content: { userObj } };
        } catch (error) {
          return { success: false, statusCode: 400, content: error };
        }
      }
    }
  }

  async handlerGetLogin(req, res) {
    let values = {};
    const tokenFromHeaders = req.headers["auth-token"];
    if (tokenFromHeaders) {
      try {
        const verified = jwt.verify(tokenFromHeaders, process.env.JWT_SECRET);
        const token = { auth_token: tokenFromHeaders };
        const isAdmin = await this.verifyAdmin(token.auth_token);
        if (isAdmin.success) {
          values = {
            id: "dashboard",
            value: "DASHBOARD",
            href: "http://localhost:5002/dashboard",
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

  async verifyAdmin(auth_token) {
    try {
      const userId = jwt.verify(auth_token, process.env.JWT_SECRET);
      const user = await this.database.User.findOne({ _id: userId });
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
