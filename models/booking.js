const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Joi = require("@hapi/joi");
Joi.objectId = require("joi-objectid")(Joi);

const Booking = mongoose.model(
  "Booking",
  new mongoose.Schema({
    userName: {
      type: String,
      required: true
    },
    facilityId: {
      type: ObjectId,
      required: true
    },
    facilityName: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    endTime: {
      type: Date,
      required: true
    },
    createdBy: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      required: true
    }
  })
);
function validateBooking(Booking) {
  const Schema = Joi.object({
    userName: Joi.string().required(),
    facilityId: Joi.objectId().required(),
    facilityName: Joi.string().required(),
    startTime: Joi.date().required(),
    endTime: Joi.date().required(),
    createdBy: Joi.string().required(),
    createdDate: Joi.date().required()
  });
  return Schema.validate(Booking);
}

exports.validate = validateBooking;
exports.Booking = Booking;
