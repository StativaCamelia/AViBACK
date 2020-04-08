const methods = {};
const indexView = require('../views/index-view');

methods.get = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    indexView.build("Home","Get method HOME",(body) => {
        res.write(body);
        res.end();
    });
}

methods.post = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    indexView.build("Home","Post method HOME",(body) => {
        res.write(body);
        res.end();
    });
}

exports.getRes = (parsedReq,res) => {
    if(parsedReq.method === 'get'){
        methods.get(parsedReq,res);
    }else{
        if(parsedReq.method === 'post'){
            methods.post(parsedReq,res);
        }else{
            res.writeHead(400);
            res.end('Method not found!');
        }
    }
}