const mongoose = require("mongoose");
const { User, validate } = require("../models/user");
const config = require("config");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.send({ data: await User.find() });
});
router.post("/register", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const existingUser = await User.find({ username: req.body.username });

  if (existingUser.length > 0)
    return res.status(400).send(`User Already exists.`);
  let user = new User({
    username: req.body.username,
    password: req.body.password
  });

  user = await user.save();
  res.send(user);
});
router.post("/login", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.sendStatus(400).send(error.details[0].message);
  let user = await User.find({
    username: req.body.username,
    password: req.body.password
  });
  user = user[0].username;
  if (!user) return res.sendStatus(401).send(`Invalid Username or Password.`);
  const token = jwt.sign(user, config.get("jwtPrivateKey"));
  res.send({
    success: true,
    message: {
      username: user,
      token
    }
  });
});

module.exports = router;
