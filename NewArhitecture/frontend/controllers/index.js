const HomeController = require("./homeController.js");
const StaticFilesController = require("./staticFilesController");
const ContactController = require("./contactController");
const MapController = require("./mapController");

const contactController = new ContactController();
const homeController = new HomeController();
const staticFilesController = new StaticFilesController();
const mapController = new MapController();

module.exports = {
  mapController,
  homeController,
  staticFilesController,
  contactController,
};
