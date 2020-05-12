require("dotenv").config();
const mongoose = require("mongoose");

const startConnection = async function () {
  try {
    await mongoose.connect(process.env.DB_CON, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("Succesful connection to database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = startConnection;
