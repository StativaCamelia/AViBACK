const HomeController = require("./homeController.js");
const ContactController = require("./contactController.js");
const ChartController = require("./chartController");
const StaticFilesController = require("./staticFilesController");
const AccidentController = require("./accidentController.js");
const MapController = require("./mapController");
const FiltresController = require("./filtresController");
const CountyController = require("./locationControllers/countyController");
const CityController = require("./locationControllers/cityController");
const StreetController = require("./locationControllers/streetController");
const StateController = require("./locationControllers/stateController");
const PieController = require("./pieController");
const ProfileController = require("./profileController");
const CounterController = require("./homePage/counterController");
const UserController = require("./userController");

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
};
