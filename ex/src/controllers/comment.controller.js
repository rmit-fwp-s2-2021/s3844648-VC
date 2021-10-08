const db = require("../database");

// Select all comments from the database.
exports.all = async (req, res) => {
  const comments = await db.comment.findAll({
    where: {
      post_id: req.body.post_id,
    },
  });

  res.json(comments);
};

// Create a comment in the database.
exports.create = async (req, res) => {
  const comment = await db.comment.create({
    text: req.body.text,
    image: req.body.image,
    likes: 0,
    dislikes: 0,
    username: req.body.username,
  });

  res.json(comment);
};
