const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

//Tell the ORM about the database
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

//Define models
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);

//Relate post and user
db.post.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

db.sync = async () => {
  //sync schema
  await db.sequelize.sync();

  //Can sync with force if the schema has become out of data note that syncing with force is...
  await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  const count = await db.user.count();

  //only seed data if necessary
  if (count > 0) return;

  const argon2 = require("argon2");

  let hash = await argon2.hash("abc123", { type: argon2.argon2id });
  await db.user.create({
    username: "mbolger",
    email: "mbolger@gmail.com",
    password_hash: hash,
  });
  hash = await argon2.hash("def456", { type: argon2.argon2id });
  await db.user.create({
    username: "shekar",
    email: "shekhar@gmail.com",
    password_hash: hash,
  });
}

module.exports = db;
