const { userController } = require("../../controllers/index");
const { User } = require("../../models/index");
const jwt = require("jsonwebtoken");

function sendAnswer(success, data, res, statusCode = 200) {
  if (success) {
    const { content } = data;
    res.writeHead(200);
    res.write(JSON.stringify(content, null, 2));
    res.end();
  } else {
    const { error } = data;
    res.writeHead(401);
    res.write(error.message);
    res.end();
  }
}

exports.getRes = async (req, res) => {
  const { path, method, body } = req;
  if (path.endsWith("/login") && method === "post") {
    let user = new User({
      username: body.username,
      password: body.password,
    });
    const message = user.validateUserLogin();
    if (message !== "") {
      res.writeHead(400, { "Content-Type": "text/html" });
      res.write(message);
      res.end();
    } else {
      const existedUser = await User.existUser(user.username, user.password);
      const userObj = {
        token: existedUser,
      };
      if (
        existedUser === "Invalid username!" ||
        existedUser === "Invalid password!"
      ) {
        res.writeHead(400, { "Content-Type": "text/html" });
        res.write(existedUser);
        res.end();
      } else {
        res.setHeader("auth-token", existedUser);
        res.writeHead(200);
        res.write(JSON.stringify(userObj));
        res.end();
      }
    }
  } else {
    if (path.endsWith("/login") && method === "get") {
      if (req.headers["auth-token"]) {
        try {
          const verified = jwt.verify(
            req.headers["auth-token"],
            process.env.JWT_SECRET
          );
          req.user = verified;
          res.writeHead(200);
          const values = {
            id: "profile",
            value: "MY PROFILE",
            href: "http://localhost:5001/profile",
          };
          res.write(JSON.stringify(values));
          res.end();
        } catch (err) {
          res.writeHead(400);
          const valuesLog = {
            id: "button",
            value: "LOGIN",
            href: "#",
          };
          res.write(JSON.stringify(valuesLog));
          res.end();
          console.log(err);
        }
      } else {
        res.writeHead(401);
        const valuesLog = {
          id: "button",
          value: "LOGIN",
          href: "#",
        };
        res.write(JSON.stringify(valuesLog));
        res.end();
      }
    }
  }
  if (path.endsWith("/register") && method === "post") {
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
    if (path.endsWith("/register") && method === "get") {
      res.writeHead(200);
      // res.write('ok');
      res.end();
    }
  }
};
