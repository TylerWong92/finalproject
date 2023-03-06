const express = require("express");
const router = express.Router();
// const { Comments } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Configuration, OpenAIApi } = require("openai");
const { Picture } = require("../models");
const { Buffer } = require("buffer");

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
// Generate Artwork from frontend not store in database
router.post("/", async (req, res) => {
  // res.json("Image Created");
  data = await predict(req);
  res.json(data);
});
// Generate Artwork from frontend from database only by userId
router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfImages = await Picture.findAll({ where: { UserId: id } });
  res.json(listOfImages);
});

// Generate Artwork from frontend from database only by PictureId
router.get("/byImageId/:pictureid", async (req, res) => {
  console.log(req.params);
  const picture = req.params.pictureid;
  const pictureObject = await Picture.findOne({ where: { id: picture } });
  console.log(pictureObject);
  res.json(pictureObject.dataValues.data);
});

// Generated Artwork from frontend store in database
// router.post("/store", validateToken, async (req, res) => {
//   const picture = req.body;
//   //Add new fill in req.body username using validateToken
//   picture.username = req.user.username;
//   picture.UserId = req.user.id;
//   await Posts.create(picture);
//   res.json(picture);
// });
router.post("/store", validateToken, async (req, res) => {
  // const buffer = Buffer.from(req.body.imageData, "base64");
  try {
    const picture = await Picture.create({
      data: req.body.imageData,
      UserId: req.user.id,
    });
    // picture.UserId = req.user.id;
    res.json("successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", validateToken, async (req, res) => {
  const PictureId = req.params.id;
  try {
    const picture = await Picture.destroy({
      where: {
        id: PictureId,
      },
    });

    // picture.UserId = req.user.id;
    res.json("successful");
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});
//   console.log(req + "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
//   await Picture.destroy({
//     where: {
//       id: PictureId,
//       UserId: req.user.id,
//     },
//   });
// });

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
