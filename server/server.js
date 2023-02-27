const express = require("express");
const app = express();

const cors = require("cors");
require("dotenv").config();
const apiKey = process.env.OPENAI_API;

const db = require("./models");

db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 30001");
  });
});
// //server running on localhost 3001
// app.listen(3001, () => {
//   console.log("Server running on port 30001");
// });
