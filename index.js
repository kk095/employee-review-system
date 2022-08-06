const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const flash = require("connect-flash");
const flashMiddleware = require("./config/flashMessage");
const passport = require("passport");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const passportLocal = require("./config/passport_local");
const expressEjsLayout = require("express-ejs-layouts");

const port = 8000;

app.use(express.urlencoded());

// static files setting
app.use(express.static(path.join(__dirname, "assets")));

app.use(
  session({
    name: "codial",
    secret: "something",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 10,
    },
    store: mongoStore.create(
      {
        mongoUrl:
          "mongodb+srv://kk095:Krishankant$095@cluster0.hoemh3q.mongodb.net/products",
        mongooseConnection: db,
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "mongostore is connected");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
// to use flash messages
app.use(flash());
app.use(flashMiddleware.flashMessage);

// ejs setting and ejs layouts
app.use(expressEjsLayout);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./router"));

app.listen(port, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("app is listening on port :", port);
});