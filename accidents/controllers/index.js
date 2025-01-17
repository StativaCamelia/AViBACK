const AccidentController = require("./accidentController.js");
const FiltresController = require("./filtresController");
const LocationController = require("./locationController");

const { Accident, State, County, City, Street, AccidentsLog } = require("../models/index");

const locationController = new LocationController({
  City,
  State,
  County,
  Street,
  Accident,
});
const filtresController = new FiltresController(
  {
    Accident,
    State,
    County,
    City,
    Street,
  },
  { locationController }
);

const accidentController = new AccidentController(
  {
    Accident,
    State,
    AccidentsLog
  },
  { filtresController }
);

module.exports = {
  accidentController,
  filtresController,
  locationController,
};
