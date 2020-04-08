const url = require('url');
const home = require('./controllers/index');
const contact = require('./controllers/contact');
const search = require('./controllers/search');
const notFound = require('./controllers/notFound');

const handlers = {
    'index.html' : home,
    'contact.html' : contact,
    'search.html' : search
};

exports.getRes = (req,res) =>{
    const parsedReq = {};

    parsedReq.parsedUrl = url.parse(req.url,true);
    parsedReq.path = parsedReq.parsedUrl.pathname;
    parsedReq.trimmedPath = parsedReq.path.replace(/^\/+|\/+$/g,'');
    parsedReq.method = req.method.toLowerCase();
    parsedReq.headers = req.headers;
    parsedReq.queryStringObject = parsedReq.parsedUrl.query;

    let body = [];

    req.on('data',(chunk) => {
        body.push(chunk);
    });

    req.on('end',() => {
        body = Buffer.concat(body).toString();
        parsedReq.body = body;

        const handleRequest = typeof (handlers[parsedReq.trimmedPath]) !== 'undefined' ? handlers[parsedReq.trimmedPath] : notFound;

        handleRequest.getRes(parsedReq,res);
    });
}