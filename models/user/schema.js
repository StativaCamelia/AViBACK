const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
  {
    email: {
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
      enum: [], //to set criterias
    },
    valueOfCriteria: {
      type: String,
      required: false,
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = userSchema;
