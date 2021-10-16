module.exports = (db, DataTypes) =>
  db.sequelize.define(
    "follow",
    {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        references: {
          model: db.user,
          key: "username",
        },
      },
      followee: {
        type: DataTypes.STRING(32),
        primaryKey: true,
        references: {
          model: db.user,
          key: "username",
        },
        onDelete: "CASCADE",
      },
    },
    {
      timestamps: false,
      onDelete: "CASCADE",
    }
  );
