const express = require("express");
const router = express.Router();
// const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Configuration, OpenAIApi } = require("openai");

//Import My OPEN-AI key
require("dotenv").config();
const apiKey = process.env.OPENAI_API;
console.log(apiKey);

//Import fs to store image to file
const fs = require("fs");

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

const predict = async function (req) {
  const response = await openai.createImage({
    prompt: req.body.prompt,
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });

  return response.data;
};

router.post("/", async (req, res) => {
  // res.json("Image Created");
  data = await predict(req);
  res.json(data);
});

module.exports = router;

// router.post("/", async (req, res) => {
//     predict(req).then((response) => {
//       const now = Date.now();
//       for (let i = 0; i < response.data.length; i++) {
//         const b64 = response.data[i]["b64_json"];
//         const buffer = Buffer.from(b64, "base64");
//         const filename = `image_${now}_${i}.png`;
//         console.log("Writing image" + filename);
//         fs.writeFileSync("image/" + filename, buffer);
//       }
//     });
//     res.json("Image Created");
//   });
