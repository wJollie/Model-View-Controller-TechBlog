const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: "userId", // This should match the foreign key in the User model
      as: "user", // This is the alias you'll use when accessing the association
    });

    Post.hasMany(models.Comment, {
      foreignKey: "postId", // This should match the foreign key in the Comment model
      as: "comments", // This is the alias you'll use when accessing the association
    });
  };

  return Post;
};
