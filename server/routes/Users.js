const express = require("express");
const bcrypt = require("bcrypt");

// Use express router
const router = express.Router();
const { Users } = require("../models");

// JWT
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({ username: username, password: hash });
    res.json("User Created");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });

  if (!user) res.json({ error: "Username or Password invalid" });

  bcrypt.compare(password, user.password).then((match) => {
    if (!match) res.json({ error: "Username or Password invalid" });

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    res.json(accessToken);
  });
});

module.exports = router;
