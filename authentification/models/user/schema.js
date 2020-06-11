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
    enum: ["", "State", "County", "City", "Street", "Timezone"],
  },
  valueOfCriteria: {
    type: String,
    required: false,
  },
  confirmed: {
    type: Boolean,
    defaultValue: false,
    require: true,
  },
});

module.exports = userSchema;
