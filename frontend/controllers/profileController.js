const { profilePage } = require("../views/index");

class ProfileController {
  constructor(database) {
    this.database = database;
  }

  getProfilePage(req, res) {
    try {
      const ids = ["", "", "active", "", "", "", ""];
      const { content, contentType } = profilePage.getPage(ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = ProfileController;
