const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const contactPageLocation = path.join(
  __dirname,
  "./components/contactPageContent.pug"
);

class ContactPage {
  constructor() {}

  getPage(ids) {
    try {
      const compiledFunction = pug.compileFile(contactPageLocation);
      const content = compiledFunction({activeIds : JSON.stringify(ids)});
      const contentType = staticFileLoader.getContentType(contactPageLocation);
      return { content, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = ContactPage;
