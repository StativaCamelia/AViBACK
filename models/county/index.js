const mongoose = require("mongoose");
const schema = require("./schema");

require("./statics.js")(schema);
const County = mongoose.model("County", schema);

module.exports = County;
