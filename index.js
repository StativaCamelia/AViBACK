const port = 5000;
const server = require("./controllers/index");
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
