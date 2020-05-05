const HomeController = require("./frontendControllers/homeController.js");
const ContactController = require("./frontendControllers/contactController.js");
const ChartController = require("./frontendControllers/chartController");
const StaticFilesController = require("./frontendControllers/staticFilesController");
const AccidentController = require("./accidentController.js");
const MapController = require("./frontendControllers/mapController");
const FiltresController = require("./filtresController");
const CountyController = require("./locationControllers/countyController");
const CityController = require("./locationControllers/cityController");
const StreetController = require("./locationControllers/streetController");
const StateController = require("./locationControllers/stateController");
const PieController = require("./frontendControllers/pieController");
const ProfileController = require("./frontendControllers/profileController");
const CounterController = require("./homePage/counterController");
const DashboardController = require("./frontendControllers/dashboardController");
const UserController = require("./userController");
const dashboardController = new DashboardController();
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
const profileController = new ProfileController({ User });
const chartController = new ChartController({
  Accident,
  State,
  County,
  City,
  Street,
});
const staticFilesController = new StaticFilesController();
const streetController = new StreetController({ Street });
const cityController = new CityController({ City });
const countyController = new CountyController({ County });
const stateController = new StateController({ State });
const counterController = new CounterController({ Accident });
const userController = new UserController({ User });

const filtresController = new FiltresController(
  {
    Accident,
    State,
    County,
    City,
    Street,
  },
  { stateController, countyController, cityController, streetController }
);
const accidentController = new AccidentController(
  {
    Accident,
    State,
  },
  { filtresController, userController }
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
  accidentController,
  filtresController,
  mapController,
  pieController,
  profileController,
  stateController,
  countyController,
  streetController,
  cityController,
  counterController,
  userController,
  dashboardController,
};
