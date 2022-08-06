const Review = require("../models/reviews");
const Employee = require("../models/employees");

module.exports.home = async function (req, res) {
  try {
    let employee = Employee.findById(req.user)
      .populate("reviewtome")
      .populate("reviewtome");

    return res.render("home", {
      employee,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.login = function (req, res) {
  if (!req.user) {
    return res.render("login");
  }
  return res.redirect("/");
};

module.exports.createSession = function (req, res) {
  console.log("login :", req.user);
  return res.redirect("/");
};

module.exports.register = function (req, res) {
  if (!req.user) {
    return res.render("signup");
  }
  return res.redirect("/");
};

module.exports.create_employee = async function (req, res) {
  try {
    // if(req.body.password)
    let employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    });
    return res.redirect("/login");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.signout = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    return res.redirect("/");
  });
};
