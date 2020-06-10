const { dashboardAccidentsPage } = require("../views/index");

class DashboardAccidentsController {
    constructor() {}

    getDashboardAccidentsPage(req, res) {
        try {
            const ids = ["", "", "", "active", "", "", "", "", ""];
            const { content, contentType } = dashboardAccidentsPage.getPage(ids);
            return { success: true, data: { content, contentType } };
        } catch (erorr) {
            return { success: false, data: { erorr } };
        }
    }
}

module.exports = DashboardAccidentsController;
