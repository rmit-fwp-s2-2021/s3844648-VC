const db = require("../database");

// Follow
exports.create = async (req, res) => {
  const follow = await db.follow.create({
    username: req.body.username,
    followee: req.body.followee,
  });

  res.json(follow);
};

// Unfollow
exports.delete = async (req, res) => {
  //const follow = await db.follow.findByPk(req.params.follows);
  const follow = await db.follow.findOne({
    where: {
      username: req.body.username,
      followee: req.body.followee,
    },
  });

  await follow.destroy();

  res.json(follow);
};
