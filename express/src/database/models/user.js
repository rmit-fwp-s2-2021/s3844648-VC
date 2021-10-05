module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(40),
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.INTEGER,
      },
      join_date: {
        type: DataTypes.STRING(40),
      },
    },
    {
      //Don't add the timestamp attributes (updatedAt, createdAt)
      timestamps: false,
    }
  );
