const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const passport = require("passport");
const mongoStore = require("connect-mongo");
const session = require("express-session");
const passportLocal = require("./config/passport_local");
const expressEjsLayout = require("express-ejs-layouts");
// const ENV = require("./environment");

// RUNNING PORT
const port = 8000;

// TO READ FORM DATA BY SERVER-SIDE, SEND BY CLIENT-SIDE
app.use(express.urlencoded());

// STATIC FILES SETTING
app.use(express.static(path.join(__dirname, "assets")));

// TO SETUP EXPRESS-SESSION
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

// SETTING FOR PASSPORT.JS
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// EJS SETTING
app.use(expressEjsLayout);
app.set("layout extractScripts", true);
app.set("layout extractStyles", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use("/", require("./router"));

app.listen(process.env.PORT, function (err) {
  if (err) {
    console.log(err);
  }
  console.log("app is listening on port :", port);
});
