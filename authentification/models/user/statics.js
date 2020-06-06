const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (schema) {
  schema.statics.existEmail = async function (email) {
    let message = "";
    const user = await this.findOne({ email: email });
    if (user) {
      message = "Email already exists!";
    }
    return message;
  };
  schema.statics.existUsername = async function (username) {
    let message = "";

    const user = await this.findOne({ username: username });
    if (user) {
      message = "Username already exists!";
    }
    return message;
  };
  schema.statics.existUser = async function (username, password) {
    let message = "";

    const user = await this.findOne({ username: username });
    if (!user) {
      message = "Invalid username or password!";
    } else if (user.confirmed === false) {
      message = "Please confirm your email";
    } else {
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass) {
        message = "Invalid username or password!";
      } else {
        message = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
      }
    }

    return message;
  };
};
