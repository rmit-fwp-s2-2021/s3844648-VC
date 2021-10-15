const db = require("../database");
const argon2 = require("argon2");

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll({
    include: { model: db.follow, as: "follows" },
  });

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id, {
    include: { model: db.follow, as: "follows" },
  });

  res.json(user);
};

// Select one user from the database if username and password are a match.
exports.login = async (req, res) => {
  const user = await db.user.findByPk(req.query.username);

  if (
    user === null ||
    (await argon2.verify(user.password_hash, req.query.password)) === false
  )
    // Login failed.
    res.json(null);
  else res.json(user);
};

// Create a user in the database.
exports.create = async (req, res) => {
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
    avatar: null,
  });

  res.json(user);
};

exports.update = async (req, res) => {
  const user = await db.user.findByPk(req.body.username);

  if (req.body.email) {
    user.email = req.body.email;
  }

  if (req.body.password) {
    const hash = await argon2.hash(req.body.password, {
      type: argon2.argon2id,
    });
    user.password_hash = hash;
  }

  if (req.body.avatar) {
    user.avatar = req.body.avatar;
  }

  await user.save();

  res.json(user);
};

exports.delete = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

  await user.destroy();

  res.json(user);
};
