require("dotenv").config();
const express = require("express");
const cors = require("cors");

const apiKey = process.env.OPENAI_API;

// Use the cors middleware

const app = express();

app.listen(3000);
