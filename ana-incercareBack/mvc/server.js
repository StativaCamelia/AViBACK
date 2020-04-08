const http = require('http');
const port = process.env.PORT || 5001;
const router = require('./router');

const server = http.createServer((req,res) => {
    router.getRes(req,res);
});

server.listen(port,() => console.log(`Server listening on port ${port}`));