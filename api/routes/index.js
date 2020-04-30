const homeRoute = require("./homeRoute");
const contactRoute = require("./contactRoute");
const mapRoute = require("./mapRoute");
const pieRoute = require("./pieRoute");
const profileRoute = require("./profileRoute");
const chartRoute = require("./chartRoute");
const stateRoute = require("./locationAPI/stateRoute");
const countyRoute = require("./locationAPI/countyRoute");
const cityRoute = require("./locationAPI/cityRoute");
const streetRoute = require("./locationAPI/streetRoute");
const counterRoute = require("./homePage/counterRoute");
const userRoute = require("./userRoute");
const accidentRoute = require("./accidentRoute");
module.exports = {
  homeRoute,
  contactRoute,
  accidentRoute,
  mapRoute,
  pieRoute,
  profileRoute,
  chartRoute,
  stateRoute,
  countyRoute,
  cityRoute,
  streetRoute,
  counterRoute,
  userRoute,
};
