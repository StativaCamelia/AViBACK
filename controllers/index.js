const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");
const AdminController = require("./adminController.js");
const MapController = require("./mapController");
const FiltresController = require("./filtresController");
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
const chartController = new ChartController({
  Accident,
  State,
  County,
  City,
  Street,
});
const staticFilesController = new StaticFilesController();
const filtresController = new FiltresController({
  Accident,
  State,
  County,
  City,
  Street,
});
const adminController = new AdminController(
  {
    Accident,
    User,
  },
  { filtresController }
);
const mapController = new MapController({
  Accident,
  State,
  County,
  City,
  Street,
});
const pieController = new PieController({
  Accident,
  State,
  County,
  City,
  Street,
});

module.exports = {
  homeController,
  contactController,
  chartController,
  staticFilesController,
  adminController,
  filtresController,
  mapController,
  pieController,
};
