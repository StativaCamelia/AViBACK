const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const homeController = new HomeController();
const contactController = new ContactController();
module.exports = { homeController, contactController };
