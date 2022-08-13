// IMPORTING ALL MODELS
const Review = require("../models/reviews");
const Employee = require("../models/employees");

// TO SHOW LOGGED-IN USER DASHBOARD
module.exports.home = async function (req, res) {
  try {
    let employee = await Employee.findById(req.user)
      .populate("reviewtome")
      .populate({
        path: "assign",
        populate: {
          path: "reviewTo",
        },
      });
    let one = 0;
    let two = 0;
    let three = 0;
    let four = 0;
    let five = 0;
    for (let i = 0; i < employee.reviewtome.length; i++) {
      let st = employee.reviewtome[i].star;
      switch (st) {
        case 1:
          one++;
          break;
        case 2:
          two++;
          break;
        case 3:
          three++;
          break;
        case 4:
          four++;
          break;
        case 5:
          five++;
          break;
        default:
          break;
      }
    }
    return res.render("home", {
      employee,
      one,
      two,
      three,
      four,
      five,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO RENDER LOGIN-IN PAGE
module.exports.login = function (req, res) {
  if (!req.user) {
    return res.render("login");
  }
  return res.redirect("/");
};

// TO LOG-IN THE USER
module.exports.createSession = function (req, res) {
  return res.redirect("/");
};

// TO RENDER  USER CREATE FORM PAGE
module.exports.register = function (req, res) {
  if (!req.user) {
    return res.render("signup");
  }
  return res.redirect("/");
};

// TO CREATE THE USER
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

// SIGNOUT THE USER
module.exports.signout = function (req, res) {
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    return res.redirect("/");
  });
};
