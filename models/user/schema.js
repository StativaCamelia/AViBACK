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
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
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
  auth_tokens: [
    {
      type: String,
    },
  ],
});

module.exports = userSchema;
