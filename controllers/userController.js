const bcrypt = require("bcrypt");
const User = require("../models/User"); // Adjust the path to your User model

const userController = {
  // Register a new user
  async register(req, res) {
    const { username, password } = req.body;

    try {
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user in the database
      const user = await User.create({
        username,
        password: hashedPassword,
      });

      res.redirect("/login"); // Redirect to login page
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },

  // Handle user login
  async login(req, res) {
    const { username, password } = req.body;

    try {
      // Find the user by their username
      const user = await User.findOne({ where: { username } });

      if (user && (await bcrypt.compare(password, user.password))) {
        req.session.user = user; // Store user data in session
        res.redirect("/dashboard"); // Redirect to user's dashboard
      } else {
        res.redirect("/login"); // Invalid credentials, redirect to login
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("An error occurred");
    }
  },

  // Handle user logout
  logout(req, res) {
    req.session.destroy(() => {
      res.redirect("/");
    });
  },
};

module.exports = userController;
