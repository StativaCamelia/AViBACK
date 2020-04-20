const mongoose = require("mongoose");
const schema = require("./schema");

require("./statics.js")(schema);
const Street = mongoose.model("Street", schema);

module.exports = Street;
