const express = require("express");
const commentController = require("../controllers/commentController"); // Adjust the path

const router = express.Router();

// Add a comment to a post
router.post("/:postId/comment", commentController.addComment);

// Other comment-related routes can be added here, such as editing or deleting comments

module.exports = router;
