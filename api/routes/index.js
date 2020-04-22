const homeRoute = require("./homeRoute");
const contactRoute = require("./contactRoute");
const adminRoute = require("./adminRoute");
const mapRoute = require("./mapRoute");
const pieRoute = require("./pieRoute");
const stateRoute = require("./locationRoutes/stateRoute");
const countyRoute = require("./locationRoutes/countyRoute");
const cityRoute = require("./locationRoutes/cityRoute");
const streetRoute = require("./locationRoutes/streetRoute");

module.exports = {
  homeRoute,
  contactRoute,
  adminRoute,
  mapRoute,
  pieRoute,
  stateRoute,
  countyRoute,
  cityRoute,
  streetRoute,
};
