const http = require("http");
const port = process.env.PORT || 5001;
const router = require("./api/index");
const db = require("./databaseCon");

db();

const server = http.createServer((req, res) => {
  if(req.url.indexOf('home') !== -1)
    console.log('aici' + req.headers['auth-token'])
  router.getRes(req, res);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
