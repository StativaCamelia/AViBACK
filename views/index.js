const HomePage = require("./homePage");
const ContactPage = require("./contactPage");
const MapPage = require("./mapPage");
const homePage = new HomePage();
const contactPage = new ContactPage();
const mapPage = new MapPage();
module.exports = {
  homePage,
  contactPage,
  mapPage,
};
