const { documentationPage } = require("../views/index");

class DocumentationController {
    constructor(database) {
        this.database = database;
    }

    getDocumentationPage(req, res) {
        try {
            const ids = ["", "", "active", "", "", "", "", "",""];
            const { content, contentType } = documentationPage.getPage(ids);
            return { success: true, data: { content, contentType } };
        } catch (erorr) {
            return { success: false, data: { erorr } };
        }
    }
}

module.exports = DocumentationController;
