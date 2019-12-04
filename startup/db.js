const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");

mongoose
  .connect(config.get("db"), {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => winston.info("Connected to MongoDB..."));
// mongoose
//   .connect("mongodb://localhost:27017/zolo", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
//   })
//   .then(() => winston.info("Connected to MongoDB..."));
