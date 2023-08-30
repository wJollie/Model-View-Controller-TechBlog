const router = require("express").Router();
const { User } = require("../../models");

router.post("/login", (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((dbUserData) => {
      if (!dbUserData) {
        // User not found, send 400 status with error message
        res.status(400).json({
          message: "No user with that username!",
        });
        return;
      }

      const validPassword = dbUserData.checkPassword(req.body.password);

      if (!validPassword) {
        // Incorrect password, send 400 status with error message
        res.status(400).json({
          message: "Incorrect password!",
        });
        return;
      }

      // Successful login logic
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;

        res.json({
          user: dbUserData,
          message: "You are now logged in!",
        });
      });
    })
    .catch((err) => {
      console.error(err); // Log the error for debugging purposes
      res.status(500).json({
        message: "An error occurred while processing your request.",
      });
    });
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end(); // Successfully logged out, send 204 status
    });
  } else {
    // User was not logged in, send 401 status with error message
    res.status(401).json({
      message: "You are not logged in.",
    });
  }
});

router.post("/signup", async (req, res) => {
  try {
    // Extract username and password from the request body
    const { username, password } = req.body;

    // Check if the username already exists in the database
    const existingUser = await User.findOne({
      where: { username },
    });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    // Create a new user in the database
    const newUser = await User.create({
      username,
      password, // Note: You should hash the password before saving it to the database
    });

    // Set up the session for the new user
    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(201).json({ user: newUser, message: "Signup successful." });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during signup." });
  }
});

// Other user routes and handlers

module.exports = router;
