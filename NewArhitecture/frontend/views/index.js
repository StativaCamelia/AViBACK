const HomePage = require("./homePage");
const ContactPage = require("./contactPage");
const MapPage = require("./mapPage");
const PiePage = require("./piePage");
const ProfilePage = require("./profilePage");
const ChartPage = require("./chartPage");
const DashboardPage = require("./dashboardPage");
const LinePage = require("./linePage");

const linePage = new LinePage();
const dashboardPage = new DashboardPage();
const homePage = new HomePage();
const contactPage = new ContactPage();
const mapPage = new MapPage();
const piePage = new PiePage();
const profilePage = new ProfilePage();
const chartPage = new ChartPage();
module.exports = {
  homePage,
  contactPage,
  mapPage,
  piePage,
  profilePage,
  dashboardPage,
  chartPage,
  linePage,
};
