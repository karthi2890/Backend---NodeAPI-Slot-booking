const mongoose = require("mongoose");
const { Facility, validate } = require("../models/facility");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  res.send({ success: true, data: await Facility.find() });
});

module.exports = router;
