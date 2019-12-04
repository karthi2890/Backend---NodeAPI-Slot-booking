const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    username: {
      type: String,
      min: 3,
      max: 50,
      required: true
    },
    password: {
      type: String,
      min: 3,
      max: 50,
      required: true
    }
  })
);
function validateUser(User) {
  const Schema = Joi.object({
    username: Joi.string()
      .required()
      .min(3)
      .max(50),
    password: Joi.string()
      .required()
      .min(3)
      .max(50)
  });
  return Schema.validate(User);
}

exports.validate = validateUser;
exports.User = User;
