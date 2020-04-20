const mongoose = require("mongoose");
const schema = require("./schema");

const City = mongoose.model("City", schema);

module.exports = City;
