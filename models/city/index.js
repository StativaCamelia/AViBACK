const mongoose = require("mongoose");
const schema = require("./schema");

require("./statics.js")(schema);
const City = mongoose.model("City", schema);

module.exports = City;
