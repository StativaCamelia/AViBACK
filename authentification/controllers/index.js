const UserController = require("./userController");
const { User, UsersLog } = require("../models/index");
const userController = new UserController({ User, UsersLog });

module.exports = { userController };
