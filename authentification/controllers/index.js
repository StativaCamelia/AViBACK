const UserController = require("./userController");
const { User } = require("../models/index");
const userController = new UserController({ User });

module.exports = { userController };
