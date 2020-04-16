const HomePage = require("./homePage");
const ContactPage = require("./contactPage");
const MapPage = require("./mapPage");
const PiePage = require("./piePage");
const homePage = new HomePage();
const contactPage = new ContactPage();
const mapPage = new MapPage();
const piePage = new PiePage();
module.exports = {
  homePage,
  contactPage,
  mapPage,
  piePage,
};
