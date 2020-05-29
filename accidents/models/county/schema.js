const mongoose = require("mongoose");

const countySchema = mongoose.Schema({
  name: { type: String },
  state: { type: String },
  timezone: { type: String },
});

module.exports = countySchema;
