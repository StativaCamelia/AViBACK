const mongoose = require("mongoose");
const { User } = require("../../models/index");

exports.getRes = async (req, res) => {
  const { fullPath, method, body } = req;
  if (fullPath.endsWith("/") && method === "post") {
    let user = new User({
      email: body.email,
      username: body.username,
      password: body.password,
    });
    const message = user.validateUserRegister();
    if (message !== "") {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.write(message);
      res.end();
    } else {
      const existedEmail = await User.existEmail(user.email);
      if (existedEmail) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write(existedEmail);
        res.end();
      } else {
        const existedUsername = await User.existUsername(user.username);
        if (existedUsername) {
          res.writeHead(400, { "Content-Type": "text/html" });
          res.write(existedUsername);
          res.end();
        } else {
          user.password = await user.hashPassword();
          try {
            const savedUser = await user.save();
            res.writeHead(200, { "Content-Type": "text/html" });
            res.write(
              "Succesfully registered! Please sign in and set your profile!"
            );
            res.end();
          } catch (err) {
            res.writeHead(401, { "Content-Type": "text/html" });
            res.write("Undefined");
            res.end();
          }
        }
      }
    }
  } else {
    if (fullPath.endsWith("/") && method === "get") {
      res.writeHead(200);
      // res.write('ok');
      res.end();
    }
  }
};
