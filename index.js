const http = require("http");
const port = process.env.PORT || 5001;
const router = require("./api/index");
const db = require("./databaseCon");

db();

const server = http.createServer((req, res) => {
  router.getRes(req, res);
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
