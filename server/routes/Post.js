const express = require("express");

// Use express router
const router = express.Router();
const { Posts } = require("../models");
const { Picture } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.get("/", async (req, res) => {
//   const listOfPosts = await Posts.findAll();

//   res.json(listOfPosts);
// });
router.get("/", async (req, res) => {
  const listOfPosts = await Posts.findAll();

  const posts = await Promise.all(
    listOfPosts.map(async (post) => {
      const picture = await Picture.findOne({
        where: { id: post.PictureId },
      });
      post.dataValues.image = picture.data;
      return post;
    })
  );
  console.log(posts);
  res.json(posts);
});

router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const post = await Posts.findByPk(id);
  res.json(post);
});

router.get("/byuserId/:id", async (req, res) => {
  const id = req.params.id;
  const listOfPosts = await Posts.findAll({ where: { UserId: id } });
  res.json(listOfPosts);
});

router.post("/", validateToken, async (req, res) => {
  const post = req.body;
  //Add new fill in req.body username using validateToken
  post.username = req.user.username;
  post.UserId = req.user.id;
  console.log(post);
  await Posts.create(post);
  res.json(post);
});

router.delete("/:postId", validateToken, async (req, res) => {
  const postId = req.params.postId;
  await Posts.destroy({
    where: {
      id: postId,
    },
  });
  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
