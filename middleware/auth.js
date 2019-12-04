const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token)
    return res.sendStatus(401).send(`Access denied. No token provided.`);

  try {
    const decoded = jwt.verify(token, config.get("jwtPrivateKey"));
    req.username = decoded;
    next();
  } catch (ex) {
    res.sendStatus(401).send(`Invalid Token.`);
  }
};
