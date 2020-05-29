const mongoose = require("mongoose");

const streetSchema = mongoose.Schema({
  name: { type: String },
  city: { type: String },
  state: { type: String },
  county: { type: String },
  timezone: { type: String },
  numbers: [{ type: String }],
});

module.exports = streetSchema;
