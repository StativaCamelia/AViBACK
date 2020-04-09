const url = require("url");
const { contactPage } = require("../views/index");

class ContactController {
  constructor(database) {
    this.database = database;
  }

  async getContactPage(req, res) {
    try {
      const { file, contentType } = await contactPage.getPage();
      res.writeHead(200, contentType);
      res.write(file);
      res.end();
    } catch (erorr) {
      console.log(erorr);
    }
  }
}

module.exports = ContactController;
