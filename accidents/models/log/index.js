const mongoose = require("mongoose");
const schema = require("./schema");

const statics = require("./statics");
statics(schema);

const AccidentsLog = mongoose.model("AccidentsLog", schema);

module.exports = AccidentsLog;
