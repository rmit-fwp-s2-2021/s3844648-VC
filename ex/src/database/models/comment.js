module.exports = (sequelize, DataTypes) =>
  sequelize.define(
    "comment",
    {
      comment_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      text: {
        type: DataTypes.STRING(600),
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING(600),
        allowNull: true,
      },
      likes: {
        type: DataTypes.INTEGER,
      },
      dislikes: {
        type: DataTypes.INTEGER,
      },
    },
    {
      timestamps: true,
      onDelete: "CASCADE",
    }
  );
