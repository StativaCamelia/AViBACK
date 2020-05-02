const { contactPage } = require("../views/index");

class ContactController {
  constructor(database) {
    this.database = database;
  }

  getContactPage(req, res) {
    try {
      const ids = ["", "active", "", "", ""];
      const { content, contentType } = contactPage.getPage(ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = ContactController;
