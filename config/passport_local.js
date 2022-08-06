const passport = require("passport");

const LocalStrategy = require("passport-local").Strategy;

const Employee = require("../models/employees");

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    function (req, email, password, done) {
      Employee.findOne({ email: email }, function (err, user) {
        if (err) {
          req.flash("error", err);
          return done(err);
        }
        if (!user || user.password != password) {
          req.flash("error", "invalid username or password !");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);

// serialization

passport.serializeUser(function (User, done) {
  done(null, User.id);
});

passport.deserializeUser(function (id, done) {
  Employee.findById(id, function (err, user) {
    if (err) {
      console.log("error in finding user during deserializing in passport js");
      return done(err);
    }
    // console.log(""user)
    return done(null, user);
  });
});

passport.checkAuthentication = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.redirect("/login");
};

passport.setAuthenticatedUser = function (req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
  }
  return next();
};

module.exports = passport;
