const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const dashboardPageLocation = path.join(
  __dirname,
  "./components/dashboardPageContent.pug"
);

class ContactPage {
  constructor() {}

  getPage(ids) {
    try {
      const compiledFunction = pug.compileFile(dashboardPageLocation);
      const content = compiledFunction({ activeIds: JSON.stringify(ids) });
      const contentType = staticFileLoader.getContentType(
        dashboardPageLocation
      );
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = ContactPage;
