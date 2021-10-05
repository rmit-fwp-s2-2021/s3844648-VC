const db = require("../database");
const argon2 = require("argon2");

//The following functions are from the Week 8 lab

// Select all users from the database.
exports.all = async (req, res) => {
  const users = await db.user.findAll();

  res.json(users);
};

// Select one user from the database.
exports.one = async (req, res) => {
  const user = await db.user.findByPk(req.params.id);

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
  //hash password
  const hash = await argon2.hash(req.body.password, { type: argon2.argon2id });

  //get date
  let today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth();
  mm = mm + 1;
  let yyyy = today.getFullYear();
  const date = `${dd}/${mm}/${yyyy}`;

  const user = await db.user.create({
    username: req.body.username,
    email: req.body.email,
    password_hash: hash,
    avatar: null,
    join_date: date,
  });

  res.json(user);
};

//update Avatar
exports.create = async (req) => {};

//update email

//update password
