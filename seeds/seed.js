const sequelize = require("../config/connection");
const { User, Post, Comment } = require("../models");

(async () => {
  await sequelize.sync({ force: true });

  try {
    const users = await User.bulkCreate([
      {
        username: "user1",
        password: "password1",
      },
      {
        username: "user2",
        password: "password2",
      },
    ]);

    const posts = await Post.bulkCreate([
      {
        title: "Post Title 1",
        content: "Content of post 1",
        user_id: users[0].id,
      },
      {
        title: "Post Title 2",
        content: "Content of post 2",
        user_id: users[1].id,
      },
    ]);

    await Comment.bulkCreate([
      {
        comment_text: "Comment on post 1",
        user_id: users[0].id,
        post_id: posts[0].id,
      },
      {
        comment_text: "Comment on post 1 by user 2",
        user_id: users[1].id,
        post_id: posts[0].id,
      },
    ]);

    console.log("Seeding complete!");
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    process.exit(0);
  }
})();
