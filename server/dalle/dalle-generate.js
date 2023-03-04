const { Configuration, OpenAIApi } = require("openai");

//Import My OPEN-AI key
require("dotenv").config();
const apiKey = process.env.OPENAI_API;

//Import fs to store image to file
const fs = require("fs");

const configuration = new Configuration({
  apiKey,
});
const openai = new OpenAIApi(configuration);

// const predict = async function () {
//   const response = await openai.createImage({
//     prompt:
//       "a yellow chair sitting in a living room next to a plant, inspired by Eszter Mattioni, featured on shutterstock, minimalism, people looking at a house, wooden walls brass panels, highly photographic render, listing image, empty room with black walls",
//     n: 1,
//     size: "256x256",
//     response_format: "b64_json",
//   });
//   //   console.log(response.data);
//   return response.data;
// };

const predict = async function (response) {
  const response = await openai.createImage({
    prompt: response.data.prompt,
    n: 1,
    size: "256x256",
    response_format: "b64_json",
  });
  //   console.log(response.data);
  return response.data;
};
// predict().then((response) => {
//   const now = Date.now();
//   for (let i = 0; i < response.data.length; i++) {
//     const b64 = response.data[i]["b64_json"];
//     const buffer = Buffer.from(b64, "base64");
//     const filename = `image_${now}_${i}.png`;
//     console.log("Writing image" + filename);
//     fs.writeFileSync("image/" + filename, buffer);
//   }
// });
