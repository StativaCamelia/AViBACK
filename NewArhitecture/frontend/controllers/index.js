const HomeController = require("./homeController.js");
const StaticFilesController = require("./staticFilesController");

const homeController = new HomeController();
const staticFilesController = new StaticFilesController();

module.exports = { homeController, staticFilesController };
