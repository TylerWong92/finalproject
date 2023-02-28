const express = require("express");
const app = express();
const cors = require("cors");

// require("dotenv").config();

app.use(express.json());
app.use(cors());

//Import db schema from models
const db = require("./models");

// Routers
const postRouter = require("./routes/Post");
app.use("/posts", postRouter);

//Run DB models before running app
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 30001");
  });
});
