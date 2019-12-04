const winston = require("winston");
const express = require("express");
const app = express();
const config = require("config");
require("./startup/db");
require("./startup/route")(app);
if (!config.get("jwtPrivateKey")) {
  winston.error(`[fatal error]:jwtPrivateKey is not defined.`);
  process.exit(1);
}

const port = process.env.port || 3001;
app.listen(port, "0.0.0.0", () =>
  winston.info(`Listening on the port: ${port}...`)
);
