const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const documentationPageLocation = path.join(
    __dirname,
    "./components/documentationPageContent.pug"
);

class DocumentationPage {
    constructor() {}

    getPage(ids) {
        try {
            const compiledFunction = pug.compileFile(documentationPageLocation);
            const content = compiledFunction({ activeIds: JSON.stringify(ids) });
            const contentType = staticFileLoader.getContentType(documentationPageLocation);
            return { content, contentType };
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = DocumentationPage;
