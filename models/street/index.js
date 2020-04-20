const mongoose = require("mongoose");
const schema = require("./schema");

const Street = mongoose.model("Street", schema);

module.exports = Street;
