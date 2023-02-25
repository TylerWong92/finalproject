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

const predict = async function () {
  const response = await openai.createImage({
    prompt: "A cute baby sea otter",
    n: 2,
    size: "256x256",
    response_format: "b64_json",
  });
  //   console.log(response.data);
  return response.data;
};

predict().then((response) => {
  const now = Date.now();
  for (let i = 0; i < response.data.length; i++) {
    const b64 = response.data[i]["b64_json"];
    const buffer = Buffer.from(b64, "base64");
    const filename = `image_${now}_${i}.png`;
    console.log("Writing image" + filename);
    fs.writeFileSync(filename, buffer);
  }
});
