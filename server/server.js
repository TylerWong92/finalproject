const express = require("express");
const app = express();
const cors = require("cors");

// require("dotenv").config();

app.use(express.json({ limit: "25mb" }));
app.use(cors());

//Import db schema from models
const db = require("./models");

// Routers
const postRouter = require("./routes/Post");
app.use("/posts", postRouter);
const commentsRouter = require("./routes/Comments");
app.use("/comments", commentsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const imageRouter = require("./routes/Picture");
app.use("/image", imageRouter);

//Run DB models before running app
db.sequelize.sync().then(() => {
  app.listen(3001, () => {
    console.log("Server running on port 30001");
  });
});
