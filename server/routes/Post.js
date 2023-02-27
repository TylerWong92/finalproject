const express = require("express");

// Use express router
const router = express.Router();
const { Posts } = require("../models");

router.get("/", (req, res) => {
  res.send("Hello World");
});

router.post("/", async (req, res) => {
  const post = req.body;
  await Posts.create(post);
  res.json(post);
});

module.exports = router;
