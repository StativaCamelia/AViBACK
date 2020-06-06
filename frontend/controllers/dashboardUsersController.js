const { dashboardUsersPage } = require("../views/index");

class DashboardUsersController {
    constructor() {}

    getDashboardUsersPage(req, res) {
        try {
            const ids = ["", "", "active", "", "", "", "", ""];
            const { content, contentType } = dashboardUsersPage.getPage(ids);
            return { success: true, data: { content, contentType } };
        } catch (erorr) {
            return { success: false, data: { erorr } };
        }
    }
}

module.exports = DashboardUsersController;
