const Comment = require("../models/Comment"); // Adjust the path to your Comment model

const commentController = {
  // Add a new comment to a post
  async addComment(req, res) {
    const postId = req.params.postId;
    const { content } = req.body;

    try {
      const comment = await Comment.create({
        content,
        postId,
        userId: req.session.user.id, // Associate comment with the logged-in user
      });

      res.redirect(`/posts/${postId}`); // Redirect to the post with comments
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },
};

module.exports = commentController;
