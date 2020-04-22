const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");
const AdminController = require("./adminController.js");
const MapController = require("./mapController");
const FiltresController = require("./filtresController");
const CountyController = require("./countyController");
const CityController = require("./cityController");
const StreetController = require("./streetController");
const StateController = require("./stateController");
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

const countyController = new CountyController({ County });
const stateController = new StateController({ State }, { countyController });

const cityController = new CityController({ City });
const streetController = new StreetController({ Street });

const filtresController = new FiltresController(
  {
    Accident,
    City,
    Street,
  },
  { stateController, countyController, cityController, streetController }
);
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
  stateController,
  countyController,
  streetController,
  cityController,
};
