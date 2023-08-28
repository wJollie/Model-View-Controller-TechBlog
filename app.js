const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./models").sequelize; // Adjust the path to your Sequelize setup
const exphbs = require("express-handlebars");

// Configure Handlebars view engine
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const sessionStore = new SequelizeStore({
  db: sequelize,
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
    cookie: {
      maxAge: 60 * 60 * 1000, // Session expires after 1 hour
    },
  })
);

const isAuthenticated = (req, res, next) => {
  if (req.session.user) {
    // User is authenticated, proceed to the next middleware
    next();
  } else {
    // User is not authenticated, redirect to login or show an error page
    res.redirect("/login"); // You can adjust the route as needed
  }
};

// Your other route handlers and middleware go here

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Welcome to your app!");
});

sequelize.sync().then(() => {
  app.listen(3000, () => {
    console.log("Server is running on port 3000");
  });
});
