// This express app is built off code from the Week 8 lab code archive

const { Sequelize, DataTypes } = require("sequelize");
const config = require("./config.js");

const db = {
  Op: Sequelize.Op,
};

// Create Sequelize.
db.sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.DIALECT,
});

// Include models.
db.user = require("./models/user.js")(db.sequelize, DataTypes);
db.post = require("./models/post.js")(db.sequelize, DataTypes);
db.comment = require("./models/comment.js")(db.sequelize, DataTypes);
db.follow = require("./models/follow.js")(db, DataTypes);

// Relations
db.post.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

db.comment.belongsTo(db.post, {
  foreignKey: { name: "post_id", allowNull: false },
});
db.comment.belongsTo(db.user, {
  foreignKey: { name: "username", allowNull: false },
});

db.user.hasMany(db.follow, {
  foreignKey: "username",
});

// Include a sync option with seed data logic included.
db.sync = async () => {
  // Sync schema.
  await db.sequelize.sync();

  // Can sync with force if the schema has become out of date - note that syncing with force is a destructive operation.
  // await db.sequelize.sync({ force: true });

  await seedData();
};

async function seedData() {
  //Users
  const userCount = await db.user.count();

  if (!(userCount > 0)) {
    const argon2 = require("argon2");

    let hash = await argon2.hash("abc123", { type: argon2.argon2id });
    await db.user.create({
      username: "mbolger",
      email: "mbolger@gmail.com",
      password_hash: hash,
      avatar: 3,
    });

    hash = await argon2.hash("def456", { type: argon2.argon2id });
    await db.user.create({
      username: "shekhar",
      email: "shekhar@gmail.com",
      password_hash: hash,
      avatar: 2,
    });

    hash = await argon2.hash("1", { type: argon2.argon2id });
    await db.user.create({
      username: "jerin",
      email: "jerin@gmail.com",
      password_hash: hash,
      avatar: 2,
    });
  }

  //Posts
  const postCount = await db.post.count();

  if (!(postCount > 0)) {
    await db.post.create({
      text: "Post A",
      image: null,
      likes: 0,
      dislikes: 0,
      username: "mbolger",
    });

    await db.post.create({
      text: "Post B",
      image: null,
      likes: 0,
      dislikes: 0,
      username: "shekhar",
    });
  }

  //Comments
  const commentCount = await db.comment.count();

  if (!(commentCount > 0)) {
    await db.comment.create({
      text: "Comment A",
      image: null,
      likes: 0,
      dislikes: 0,
      username: "shekhar",
      post_id: 1,
    });

    await db.comment.create({
      text: "Comment B",
      image: null,
      likes: 0,
      dislikes: 0,
      username: "jerin",
      post_id: 2,
    });
  }

  //Follows
  const followCount = await db.follow.count();
  if (!(followCount > 0)) {
    await db.follow.create({
      username: "jerin",
      followee: "mbolger",
    });

    await db.follow.create({
      username: "jerin",
      followee: "shekhar",
    });

    await db.follow.create({
      username: "mbolger",
      followee: "shekhar",
    });
  }
}

module.exports = db;
