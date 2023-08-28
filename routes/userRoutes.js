const express = require("express");
const userController = require("../controllers/userController"); // Adjust the path

const router = express.Router();

// User registration route
router.post("/register", userController.register);

// User login route
router.post("/login", userController.login);

// User logout route
router.get("/logout", userController.logout);

module.exports = router;
