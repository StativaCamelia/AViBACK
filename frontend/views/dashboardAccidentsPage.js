const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const dashboardAccidentsPageLocation = path.join(
  __dirname,
  "./components/dashboardAccidentsPageContent.pug"
);

class DashboardAccidentsPage {
  constructor() {}

  getPage(ids) {
    try {
      const compiledFunction = pug.compileFile(dashboardAccidentsPageLocation);
      const content = compiledFunction({ activeIds: JSON.stringify(ids) });
      const contentType = staticFileLoader.getContentType(
        dashboardAccidentsPageLocation
      );
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = DashboardAccidentsPage;
