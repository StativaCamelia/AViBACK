const mongoose = require("mongoose");

const stateSchema = mongoose.Schema({
  name: { type: String },
  abbreviation: { type: String },
  timezone: { type: String },
});

module.exports = stateSchema;
