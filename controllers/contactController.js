const url = require("url");
const staticFileLoader = require("../staticFileLoader/index");

class ContactController {
  constructor() {}

  getContactPage(req, res) {
    console.log("Contact");
  }
}

module.exports = ContactController;
