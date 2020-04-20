const mongoose = require("mongoose");

const streetSchema = mongoose.Schema({
  name: { type: String },
  city: { type: String },
  numbers: [{ type: String }],
});

module.exports = streetSchema;
