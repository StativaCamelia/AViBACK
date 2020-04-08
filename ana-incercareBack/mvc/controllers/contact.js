const methods = {};
const contactView = require('../views/contact-view');

methods.get = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    contactView.build("Contact","Get method CONTACT",(body) => {
        res.write(body);
        res.end();
    });
}

methods.post = (parsedReq,res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });
    contactView.build("Contact","Post method CONTACT",(body) => {
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