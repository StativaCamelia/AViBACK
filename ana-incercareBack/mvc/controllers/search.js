const methods = {};
const searchView = require('../views/search-view');

methods.get = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    searchView.build("Search","Get method SEARCH",(body) => {
        res.write(body);
        res.end();
    });
}

methods.post = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    searchView.build("Search","Post method SEARCH",(body) => {
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