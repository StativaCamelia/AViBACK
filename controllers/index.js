const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");

const { User, Accident } = require("../models/index");
const homeController = new HomeController({ User, Accident });
const contactController = new ContactController(User);
const chartController = new ChartController();
const staticFilesController = new StaticFilesController();

module.exports = {
  homeController,
  contactController,
  chartController,
  staticFilesController,
};
