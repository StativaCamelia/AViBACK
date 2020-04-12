const User = require("./user/index");
const userValidaionSchema = require("./user/validator");

const Accident = require("./accident/index");
module.exports = {
  User,
  Accident,
  userValidaionSchema,
};
