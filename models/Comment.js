const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Comment = sequelize.define("Comment", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  });

  Comment.associate = (models) => {
    Comment.belongsTo(models.User, {
      foreignKey: "userId", // This should match the foreign key in the User model
      as: "user", // This is the alias you'll use when accessing the association
    });

    Comment.belongsTo(models.Post, {
      foreignKey: "postId", // This should match the foreign key in the Post model
      as: "post", // This is the alias you'll use when accessing the association
    });
  };

  return Comment;
};
