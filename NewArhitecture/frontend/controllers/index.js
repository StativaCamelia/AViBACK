const HomeController = require("./homeController.js");
const StaticFilesController = require("./staticFilesController");
const ContactController = require("./contactController");
const MapController = require("./mapController");
const PieController = require("./pieController");
const ChartController = require("./chartController");
const contactController = new ContactController();
const homeController = new HomeController();
const staticFilesController = new StaticFilesController();
const mapController = new MapController();
const pieController = new PieController();
const chartController = new ChartController();

module.exports = {
  mapController,
  homeController,
  staticFilesController,
  contactController,
  pieController,
  chartController
};
