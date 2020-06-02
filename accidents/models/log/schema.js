const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
    method: {
        type: String,
    },
    date: {
        type: Date,
    },
});

module.exports = logSchema;