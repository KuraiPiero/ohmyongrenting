var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");
require("dotenv/config");
// Setting up port
var PORT = process.env.PORT || 3300;
//Import the models folder
var db = require("./models");
//
// Creating express app and configuring middleware
//needed to read through our public folder
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
// We need to use sessions to keep track of our user's login status
app.use(
  session({
    secret: "super_secret",
    resave: true,
    saveUninitialized: true
  })
);
app.use(passport.initialize());
app.use(passport.session());
//we are doing a GET to test if our server is working fine
app.get("/", function(req, res) {
  res.send("Welcome to Passport with Sequelize and without HandleBars");
});

// Requiring our routes
const route1 = require("./routes/html-routes.js");
const route2 = require("./routes/api-routes.js");
const userdb = require("./routes/DBUsuario");
app.use("/", userdb);
const tokendb = require("./routes/DBvericationtoken");
app.use("/", tokendb);

db.sequelize.sync().then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
