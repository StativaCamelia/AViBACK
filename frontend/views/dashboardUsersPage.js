const path = require("path");
const staticFileLoader = require("../staticFileLoader/index");
const pug = require("pug");
const dashboardUsersPageLocation = path.join(
    __dirname,
    "./components/dashboardUsersPageContent.pug"
);

class DashboardUsersPage{
    constructor() {}

    getPage(ids) {
        try {
            const compiledFunction = pug.compileFile(dashboardUsersPageLocation);
            const content = compiledFunction({ activeIds: JSON.stringify(ids) });
            const contentType = staticFileLoader.getContentType(
                dashboardUsersPageLocation
            );
            return { content, contentType };
        } catch (err) {
            console.log(err);
            return err;
        }
    }
}

module.exports = DashboardUsersPage;
