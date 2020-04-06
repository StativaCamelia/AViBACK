const port = 5000;
const server = require("./controllers/index");
const csvtojson = require("csvtojson");
server.listen(port, () => {
  console.log(`Server running at port ${port}`);
  csvtojson()
    .fromFile("C:Users/stati/Desktop/US_Accidents_Dec19.csv")
    .then((csvData) => {
      console.log(csvData);
    });
});
