const { mapPage } = require("../views/index");

class ContactController {
  constructor(database) {
    this.database = database;
  }

  getMapPage(req, res) {
    try {
      const { content, contentType } = mapPage.getMapPage();
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = ContactController;
