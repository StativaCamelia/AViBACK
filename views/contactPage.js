const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const contactPageLocation = path.join(
  __dirname,
  "./components/contactPageContent.pug"
);

class ContactPage {
  constructor() {}

  getPage() {
    try {
      const compiledFunction = pug.compileFile(contactPageLocation);
      const file = compiledFunction();
      const contentType = staticFileLoader.getContentType(contactPageLocation);
      return { file, contentType };
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}

module.exports = ContactPage;
