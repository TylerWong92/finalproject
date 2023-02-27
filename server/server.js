require("dotenv").config();
const apiKey = process.env.OPENAI_API;
const express = require("express");

const app = express();

app.listen(3000);
