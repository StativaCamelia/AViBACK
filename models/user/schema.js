const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    min: 10,
  },
  username: {
    type: String,
    required: true,
    min: 10,
  },
  password: {
    type: String,
    required: true,
    min: 6,
  },
  criteria: {
    type: String,
    required: false,
    enum: [],
  },
  valueOfCriteria: {
    type: String,
    required: false,
  },
});

module.exports = userSchema;
