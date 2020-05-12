const mongoose = require("mongoose");
const schema = require("./schema");

const methods = require("./methods");
methods(schema);

const statics = require("./statics");
statics(schema);

const User = mongoose.model("User", schema);

module.exports = User;
