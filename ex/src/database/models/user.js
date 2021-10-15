module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "user",
    {
      username: {
        type: DataTypes.STRING(32),
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(254),
        allowNull: false,
      },
      password_hash: {
        type: DataTypes.STRING(96),
        allowNull: false,
      },
      avatar: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      timestamps: true,
      onDelete: "CASCADE",
    }
  );
