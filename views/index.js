const HomePage = require("./homePage");
const ContactPage = require("./contactPage");
const MapPage = require("./mapPage");
const PiePage = require("./piePage");
const ChartPage = require("./chartPage");
const homePage = new HomePage();
const contactPage = new ContactPage();
const mapPage = new MapPage();
const piePage = new PiePage();
const chartPage = new ChartPage();
module.exports = {
  homePage,
  contactPage,
  mapPage,
  piePage,
  chartPage,
};
