const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");
const AdminController = require("./adminController.js");
const MapController = require("./mapController");
const PieController = require("./pieController");
const {
  User,
  Accident,
  State,
  County,
  City,
  Street,
} = require("../models/index");

const homeController = new HomeController({ User, Accident });
const contactController = new ContactController({ Accident });
const chartController = new ChartController();
const staticFilesController = new StaticFilesController();
const adminController = new AdminController({
  Accident,
  User,
  State,
  County,
  City,
  Street,
});
const mapController = new MapController({ Accident });
const pieController = new PieController({ Accident });
module.exports = {
  homeController,
  contactController,
  chartController,
  staticFilesController,
  adminController,
  mapController,
  pieController,
};
