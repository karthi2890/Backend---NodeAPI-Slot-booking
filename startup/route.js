const cors = require("cors");
const express = require("express");
const facility = require("../routes/facility");
const booking = require("../routes/booking");
const user = require("../routes/user");
const error = require("../middleware/error");
const aysnc = require("../middleware/async");

module.exports = function(app) {
  app.use(cors());
  app.use(express.json());
  app.use("/api/user", user);
  app.use("/api/facility", facility);
  app.use("/api/booking", booking);
  app.use(error);
  app.use(aysnc);
};
