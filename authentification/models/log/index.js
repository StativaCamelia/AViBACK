const mongoose = require("mongoose");
const schema = require("./schema");

const statics = require("./statics");
statics(schema);

const UsersLog = mongoose.model("UsersLog", schema);

module.exports = UsersLog;
