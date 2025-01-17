const bcrypt = require("bcrypt");

function isEmail(email) {
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

function isInvalidInput(input) {
  return /[!$%^@&*()+|~=`{}\[\]:";'<>?,\\/]/.test(input);
}

module.exports = function (schema) {
  const errorMessage = "Incorrect data!";
  schema.methods.validateUserRegister = function () {
    let message = "";
    const user = this;
    if (user.email === "" || user.username === "" || user.password === "") {
      message = "Blank field(s)!";
    } else {
      if (
        !isEmail(user.email) ||
        user.username.length < 6 ||
        user.password.length < 6 ||
        isInvalidInput(user.username) ||
        isInvalidInput(user.password)
      ) {
        message = errorMessage;
      }
    }
    return message;
  };
  schema.methods.hashPassword = async function () {
    let user = this;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    return hashedPassword;
  };

  schema.methods.validateUserLogin = function () {
    let message = "";
    const user = this;
    if (user.username === "" || user.password === "") {
      message = "Blank field(s)!";
    } else {
      if (
        user.username.length < 6 ||
        user.password.length < 6 ||
        isInvalidInput(user.username) ||
        isInvalidInput(user.password)
      ) {
        message = errorMessage;
      }
    }
    return message;
  };
};
