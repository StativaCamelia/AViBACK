const mongoose = require("mongoose");
const schema = require("./schema");

require("./statics.js")(schema);
const State = mongoose.model("State", schema);

module.exports = State;
