const mongoose = require("mongoose");

const countySchema = mongoose.Schema({
  name: { type: String },
  state: { type: String },
});

module.exports = countySchema;
