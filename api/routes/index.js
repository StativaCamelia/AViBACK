const homeRoute = require("./homeRoute");
const contactRoute = require("./contactRoute");
const adminRoute = require("./adminRoute");
const mapRoute = require("./mapRoute");
const pieRoute = require("./pieRoute");
const registerRoute = require('./registerRoute');
const loginRoute = require('./loginRoute');
const profileRoute = require('./profileRoute');
const chartRoute = require("./chartRoute");
const stateRoute = require("./locationAPI/stateRoute");
const countyRoute = require("./locationAPI/countyRoute");
const cityRoute = require("./locationAPI/cityRoute");
const streetRoute = require("./locationAPI/streetRoute");

module.exports = {
  homeRoute,
  contactRoute,
  adminRoute,
  mapRoute,
  pieRoute,
  registerRoute,
  loginRoute,
  profileRoute,
  chartRoute,
  stateRoute,
  countyRoute,
  cityRoute,
  streetRoute,
};
