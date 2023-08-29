const express = require("express");
const path = require("path");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./models"); // Adjust the path to your models folder
const userRoutes = require("./routes/userRoutes"); // Adjust the path to your userRoutes file
const postRoutes = require("./routes/postRoutes"); // Adjust the path to your postRoutes file
const commentRoutes = require("./routes/commentRoutes"); // Adjust the path to your commentRoutes file
require("dotenv").config();

const app = express();

// Set up view engine (Handlebars)
const exphbs = require("express-handlebars");
const handlebars = exphbs.create({
  defaultLayout: "main",
  extname: ".hbs",
  layoutsDir: path.join(__dirname, "views", "layouts"), // Corrected path
  partialsDir: path.join(__dirname, "views", "partials"),
});
app.engine(".hbs", handlebars.engine);
app.set("view engine", ".hbs");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// Set up session
const sessionStore = new SequelizeStore({
  db: db.sequelize,
});
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
);

// Routes
app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.get("/", (req, res) => {
  res.render("home"); // Render the 'home' view using the 'main' layout
});

app.get("/dashboard", (req, res) => {
  res.render("dashboard"); // Render the 'dashboard' view using the 'main' layout
});

// Error handling
app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.render("error", { error });
});

// Start the server
const PORT = process.env.PORT || 3000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
