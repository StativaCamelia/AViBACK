const { dashboardController, dashboardUsersController, dashboardAccidentsController } = require("../../controllers/index");

function sendAnswer(success, data, res, statusCode = 200) {
    if (success) {
        const { contentType, content } = data;
        res.writeHead(200, contentType);
        res.write(content);
        res.end();
    } else {
        const { erorr } = data;
        res.writeHead(401);
        res.write("Undefined");
        res.end();
    }
}

exports.getRes = (req, res) => {
    const { path, method, body } = req;
    if(path.endsWith("dashboard/users") && method === "get"){
        try {
            const { success, data } = dashboardUsersController.getDashboardUsersPage(req, res);
            sendAnswer(success, data, res);
        } catch (error) {
            console.log(error);
        }
    }else{
        if(path.endsWith("dashboard/accidents") && method === "get"){
            try {
                const { success, data } = dashboardAccidentsController.getDashboardAccidentsPage(req, res);
                sendAnswer(success, data, res);
            } catch (error) {
                console.log(error);
            }
        }else{
            if (path.endsWith("dashboard") && method === "get") {
                try {
                    const { success, data } = dashboardController.getDashboardPage(req, res);
                    sendAnswer(success, data, res);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
};
