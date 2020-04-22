const mongoose = require("mongoose");

const citySchema = mongoose.Schema({
  name: { type: String },
  county: { type: String },
  state: { type: String },
});

module.exports = citySchema;
