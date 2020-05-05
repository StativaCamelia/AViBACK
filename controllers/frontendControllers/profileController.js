const url = require("url");
const { User } = require("../../models/index");
const { profilePage } = require("../../views/index");

class ProfileController {
  constructor(dataBase) {
    this.dataBase = dataBase;
  }

  getProfilePage(req, res) {
    try {
      const ids = ["", "", "", "", ""];
      const { content, contentType } = profilePage.getPage(ids);
      return { success: true, data: { content, contentType } };
    } catch (erorr) {
      return { success: false, data: { erorr } };
    }
  }
}

module.exports = ProfileController;
