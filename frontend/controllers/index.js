const HomeController = require("./homeController.js");
const StaticFilesController = require("./staticFilesController");
const ContactController = require("./contactController");
const MapController = require("./mapController");
const PieController = require("./pieController");
const ChartController = require("./chartController");
const ProfileController = require("./profileController");
const LineController = require("./lineController");
const DashboardController = require("./dashboardController");
const DashboardUsersController = require("./dashboardUsersController");
const DashboardAccidentsController = require("./dashboardAccidentsController");

const contactController = new ContactController();
const homeController = new HomeController();
const staticFilesController = new StaticFilesController();
const mapController = new MapController();
const pieController = new PieController();
const chartController = new ChartController();
const profileController = new ProfileController();
const lineController = new LineController();
const dashboardController = new DashboardController();
const dashboardUsersController = new DashboardUsersController();
const dashboardAccidentsController = new DashboardAccidentsController();

module.exports = {
  mapController,
  homeController,
  staticFilesController,
  contactController,
  pieController,
  chartController,
  profileController,
  lineController,
  dashboardController,
  dashboardUsersController,
  dashboardAccidentsController
};
