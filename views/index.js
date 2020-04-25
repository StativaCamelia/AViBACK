const HomePage = require("./homePage");
const ContactPage = require("./contactPage");
const MapPage = require("./mapPage");
const PiePage = require("./piePage");
const ProfilePage = require('./profilePage');
const homePage = new HomePage();
const contactPage = new ContactPage();
const mapPage = new MapPage();
const piePage = new PiePage();
const profilePage = new ProfilePage();

module.exports = {
  homePage,
  contactPage,
  mapPage,
  piePage,
  profilePage
};
