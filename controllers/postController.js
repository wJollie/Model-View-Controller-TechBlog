const Post = require("../models/Post"); // Adjust the path to your Post model

const postController = {
  // Create a new blog post
  async createPost(req, res) {
    const { title, content } = req.body;

    try {
      const post = await Post.create({
        title,
        content,
        userId: req.session.user.id, // Associate post with the logged-in user
      });

      res.redirect(`/posts/${post.id}`); // Redirect to the created post
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },

  // Update a blog post
  async updatePost(req, res) {
    const postId = req.params.id;
    const { title, content } = req.body;

    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post not found");
      }

      await post.update({
        title,
        content,
      });

      res.redirect(`/posts/${post.id}`); // Redirect to the updated post
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },

  // Delete a blog post
  async deletePost(req, res) {
    const postId = req.params.id;

    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post not found");
      }

      await post.destroy();

      res.redirect("/dashboard"); // Redirect to the user's dashboard
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },

  // Display individual post page
  async getPost(req, res) {
    const postId = req.params.id;

    try {
      const post = await Post.findByPk(postId);

      if (!post) {
        return res.status(404).send("Post not found");
      }

      res.render("post", { post }); // Render the post template
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },
};

module.exports = postController;
