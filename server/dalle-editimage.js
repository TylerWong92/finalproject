const { Configuration, OpenAIApi } = require("openai");
const fs = require("fs");

// Import My OPEN-AI key
require("dotenv").config();
const apiKey = process.env.OPENAI_API;

const configuration = new Configuration({ apiKey });
const openai = new OpenAIApi(configuration);

const src = "./image/coder.png";
const mask = "./image/mask.png";

const editImage = async function () {
  const response = await openai.createImageEdit(
    fs.createReadStream(src),
    fs.createReadStream(mask),
    "woman in background of paris city",
    1,
    "256x256"
  );
  console.log(response.data.data[0].url);
  return response.data;
};

editImage();

// fs.readFile(src, (err, data) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log(data);
// });
