const mongoose = require("mongoose");
const Joi = require("@hapi/joi");

const Facility = mongoose.model(
  "Facility",
  new mongoose.Schema({
    name: {
      type: String,
      required: true
    },
    description: {
      type: String
    }
  })
);
function validateFacility(Facility) {
  const Schema = Joi.object({
    name: Joi.string()
      .required()
      .min(3)
      .max(50),
    description: Joi.string()
  });
  return Schema.validate(Facility);
}

exports.validate = validateFacility;
exports.Facility = Facility;
