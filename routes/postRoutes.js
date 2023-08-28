const express = require("express");
const postController = require("../controllers/postController"); // Adjust the path

const router = express.Router();

// Create a new post
router.post("/create", postController.createPost);

// Update a post
router.put("/:id/update", postController.updatePost);

// Delete a post
router.delete("/:id/delete", postController.deletePost);

// Display individual post page
router.get("/:id", postController.getPost);

module.exports = router;
