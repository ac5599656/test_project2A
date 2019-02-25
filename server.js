require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
let cookieParser = require("cookie-parser");
let authRouter = require("./routes/auth.js");
var db = require("./models");
let session = require("express-session");

let path = require("path");
let passport = require("passport");
let routes = require("./routes/index");
let auth = require("./routes/auth");
let app = express();
app.set("port", process.env.PORT || 3000);
// let PORT = process.env.PORT || 3000;
require("./config/passport");

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
// app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));
//cookieParser
app.use(cookieParser());
//session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);
//passport
app.use(passport.initialize());
app.use(passport.session());

app.use(authRouter);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
app.use("/", routes);
app.use("/auth", auth);
require("./routes/external-api-routes")(app);
require("./routes/person-api-routes")(app);
require("./routes/post-api-routes")(app);
require("./routes/comment-api-routes")(app);
require("./routes/html-routes")(app);

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "alcoholic_beverages_db") {
  syncOptions.force = false;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(app.get("port"), function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      // PORT,
      // PORT
    );
  });
});

module.exports = app;