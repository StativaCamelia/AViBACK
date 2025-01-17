const mongoose = require("mongoose");
const schema = require("./schema");

require("./statics.js")(schema);

const Accident = mongoose.model("Accident", schema);

module.exports = Accident;
