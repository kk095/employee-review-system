const Employee = require("../models/employees");
const Review = require("../models/reviews");

module.exports.dashboard = function (req, res) {};

module.exports.addEmployees = async function (req, res) {
  try {
    let employee = await Employee.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      isAdmin: false,
    });
    return res.redirect("/admin/dashboard/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.removeEmployees = async function (req, res) {
  try {
    let employee = await Employee.findByIdAndDelete(req.params.id);
    return res.redirect("/admin/dashboard");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.updateEmployees = async function (req, res) {
  try {
    let employee = await Employee.findByIdAndUpdate(req.body);
    return res.redirect("/admin/dashboard");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.viewEmployees = async function (req, res) {
  try {
    let employee = await Employee.findById(req.params.id);
    return res.render("employee", {
      employee,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.makeAdminEmployees = async function (req, res) {
  try {
    let employee = Employee.findByIdAndUpdate(req.params.id, {
      isAdmin: true,
    });
    return res.redirect("/admin/dashboard");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.addReviews = async function (req, res) {
  try {
    let review = await Review.create({
      review: req.body.review,
      reviewTo: req.body.user,
      reviewFrom: req.user,
      star: req.body.star,
    });
    return res.redirect("/admin/dashboard");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

module.exports.updateReviews = async function (req, res) {
  try {
    let review = Review.findByIdAndUpdate(req.params.id, req.body);
    return res.redirect("/admin/dashboard");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// module.exports.viewReviews = async function (req, res) {
//   try {
//     let reviews = Review.find({ reviewTo: req.params.id });
//     return
//   } catch (e) {
//     console.log(e);
//     return res.redirect("/");
//   }
// };

module.exports.assignEmployeeToReview = async function (req, res) {
  try {
    let employee = await Employee.findById(req.body.reviewGiven);
    let employee_review = await Employee.findById(req.body.reviewTo);
    employee.push(employee_review);
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};
