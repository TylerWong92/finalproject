const express = require("express");
const bcrypt = require("bcrypt");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Use express router
const router = express.Router();
const { Users } = require("../models");

// JWT
const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  // Check in my user list if username is not taken
  const checkUserName = await Users.findOne({ where: { username: username } });

  if (!checkUserName) {
    const hash = await bcrypt.hash(password, 10);
    await Users.create({ username: username, password: hash });
    res.json("User Created");
  } else {
    res.json("Username Taken");
  }
});

// User login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  // Empty User
  if (!username) {
    res.json({ error: "Username is required" });
    return;
  }
  // Empty Pass
  if (!password) {
    res.json({ error: "Password is required" });
    return;
  }
  // User not register
  const user = await Users.findOne({ where: { username: username } });
  if (!user) {
    res.json({ error: "Wrong username or password combination!" });
    return;
  }
  // Check Hash pass and provide Token
  bcrypt.compare(password, user.password).then((match) => {
    if (match) {
      const accessToken = sign(
        { username: user.username, id: user.id },
        "importantsecret"
      );
      res.json({ token: accessToken, username: user.username, id: user.id });
    } else {
      res.json({ error: "Wrong username or password combination!" });
    }
  });
});

// Check if user has the valid token prevent fake token and return user information
router.get("/valid", validateToken, (req, res) => {
  res.json(req.user);
});

// Find user info without the user password
router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;

  const basicInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });

  res.json(basicInfo);
});

module.exports = router;
