const mongoose = require("mongoose");
const { Booking, validate } = require("../models/booking");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.sendStatus(400).send(error.details[0].message);
  let booking = new Booking({
    userName: req.body.userName,
    facilityId: req.body.facilityId,
    facilityName: req.body.facilityName,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    createdBy: req.body.createdBy,
    createdDate: req.body.createdDate
  });
  const check = await Booking.find({
    $and: [
      { facilityId: booking.facilityId },
      { startTime: { $gte: booking.startTime, $lte: booking.startTime } },
      { endTime: { $lte: booking.endTime, $gte: booking.endTime } }
    ]
  });
  if (check.length)
    return res.send({
      success: false,
      message: "Selected slot is unavailable."
    });
  booking = await booking.save();
  res.send({ success: true, booking });
});

module.exports = router;
