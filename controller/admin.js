// IMPORTING ALL MODELS
const Employee = require("../models/employees");
const Review = require("../models/reviews");
const Assign = require("../models/assign");

// TO SHOW DASHBOARD OF EVERY USER TO ADMIN
module.exports.dashboard = async function (req, res) {
  try {
    let employee = await Employee.findById(req.params.id)
      .populate({
        path: "reviewtome",
        populate: {
          path: "reviewFrom",
        },
      })
      .populate({
        path: "assign",
        populate: {
          path: "reviewTo reviewFrom",
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
    return res.render("profile", {
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

// TO DELETE THE USER
module.exports.removeEmployees = async function (req, res) {
  try {
    let employee = await Employee.findById(req.params.id);
    let assigntome = await Assign.find({ reviewTo: employee.id });
    assigntome.forEach((e) => {
      e.remove();
    });
    let assign = await Assign.find({ reviewFrom: employee.id });
    assign.forEach((e) => {
      e.remove();
    });
    let reviewtome = await Review.find({ reviewTo: employee.id });
    reviewtome.forEach((e) => {
      e.remove();
    });
    let review = await Review.find({ reviewFrom: employee.id });
    review.forEach((e) => {
      e.remove();
    });
    employee.remove();
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO VIEW ALL EMPLOYEES
module.exports.viewEmployees = async function (req, res) {
  try {
    let employee = await Employee.find({});
    return res.render("employee", {
      employee,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO MAKE EMPLOYEE ADMIN
module.exports.makeAdminEmployees = async function (req, res) {
  try {
    console.log("my id :", req.params.id);
    let employee = await Employee.findByIdAndUpdate(req.params.id, {
      isAdmin: true,
    });
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO DELETE REVIEWS
module.exports.updateReviews = async function (req, res) {
  try {
    let review = await Review.findById(req.params.review);
    let employeeto = await Employee.findByIdAndUpdate(req.params.id, {
      $pull: { reviewtome: review.id },
    });
    let employeefrom = await Employee.findByIdAndUpdate(req.params.reviewid, {
      $pull: { reviewbyme: review.id },
    });
    review.remove();
    return res.redirect("back");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO RENDER ASSIGN PAGE
module.exports.reviewPage = async function (req, res) {
  try {
    let employees = await Employee.find({});
    return res.render("assign", {
      employees,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO ASSIGN REVIEW TO EMPLOYEE
module.exports.assignEmployeeToReview = async function (req, res) {
  try {
    let employee = await Employee.findOne({ email: req.body.reviewby });
    let employee_review = await Employee.findOne({ email: req.body.reviewto });
    let assign = await Assign.create({
      reviewTo: employee_review,
      reviewFrom: employee,
    });
    employee.assign.push(assign);
    employee.save();
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO REMOVE ASSIGNED REVIEW
module.exports.removeAssign = async function (req, res) {
  console.log("id:", req.params.id);
  console.log("assign:", req.params.assign);
  try {
    let assign = await Assign.findById(req.params.assign);
    let employee = await Employee.findByIdAndUpdate(req.params.id, {
      $pull: { assign: assign.id },
    });
    assign.remove();
    return res.redirect("back");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};
