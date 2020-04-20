const mongoose = require("mongoose");
const schema = require("./schema");

const County = mongoose.model("County", schema);

module.exports = County;
