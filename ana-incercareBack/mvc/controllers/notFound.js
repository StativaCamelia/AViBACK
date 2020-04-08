const notFoundView = require('../views/notFound-view');

exports.getRes = (parsedReq,res) => {
    res.writeHead(404, {
        'Content-Type': 'text/html'
    });
    notFoundView.build("Not found","Page not found!",(body) => {
        res.write(body);
        res.end();
    });
}