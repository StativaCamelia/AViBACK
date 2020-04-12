const mongoose = require("mongoose");
const schema = require("./schema");

const Accident = mongoose.model("Accident", schema);

module.exports = Accident;
