const homeRoute = require("./frontendRoutes/homeRoute");
const contactRoute = require("./frontendRoutes/contactRoute");
const mapRoute = require("./frontendRoutes/mapRoute");
const pieRoute = require("./frontendRoutes/pieRoute");
const profileRoute = require("./frontendRoutes/profileRoute");
const chartRoute = require("./frontendRoutes/chartRoute");
const stateRoute = require("./locationAPI/stateRoute");
const countyRoute = require("./locationAPI/countyRoute");
const cityRoute = require("./locationAPI/cityRoute");
const streetRoute = require("./locationAPI/streetRoute");
const counterRoute = require("./homePage/counterRoute");
const userRoute = require("./userRoute");
const accidentRoute = require("./accidentRoute");
const filtersRoute = require("./filtersRoute");
const dashboardRoute = require("./frontendRoutes/dashboardRoute");

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
  filtersRoute,
  dashboardRoute,
};
