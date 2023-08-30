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

// Other user routes and handlers

module.exports = router;
