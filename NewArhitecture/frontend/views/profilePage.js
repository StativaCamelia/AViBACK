const fs = require("mz/fs");
const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const profilePageLocation = path.join(
    __dirname,
    "./components/profilePageContent.pug"
);

class ProfilePage {
    constructor() {}
    getPage(ids) {
        try {
            const compiledFunction = pug.compileFile(profilePageLocation);
            const content = compiledFunction({activeIds : JSON.stringify(ids)});
            const contentType = staticFileLoader.getContentType(profilePageLocation);
            return { content, contentType };
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = ProfilePage;
