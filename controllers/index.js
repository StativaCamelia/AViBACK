const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");
const AdminController = require("./adminController.js");
const MapController = require("./mapController");
const { User, Accident } = require("../models/index");

const homeController = new HomeController({ User, Accident });
const contactController = new ContactController({ Accident });
const chartController = new ChartController();
const staticFilesController = new StaticFilesController();
const adminController = new AdminController({ Accident, User });
const mapController = new MapController({ Accident });
module.exports = {
  homeController,
  contactController,
  chartController,
  staticFilesController,
  adminController,
  mapController,
};
