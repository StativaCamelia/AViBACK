const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const contactPageLocation = path.join(__dirname, "./contact.html");

class ContactPage {
  constructor() {}

  async getPage() {
    try {
      const file = await staticFileLoader.getFileContent(contactPageLocation);
      const contentType = staticFileLoader.getContentType("pug");
      return { file, contentType };
    } catch (err) {
      return err;
    }
  }
}

module.exports = ContactPage;
