// IMPORTING ALL MODELS
const Employee = require("../models/employees");
const Review = require("../models/reviews");
const Assign = require("../models/assign");

// TO RENDER REVIEW FORM  PAGE
module.exports.requiringReviews = async function (req, res) {
  try {
    let assign = await Assign.findById(req.params.id);
    let reviewTo = await Employee.findById(assign.reviewTo);
    return res.render("review", {
      reviewTo: reviewTo.id,
      assign: assign.id,
    });
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};

// TO SUBMIT THE REVIEWS
module.exports.submitReviews = async function (req, res) {
  try {
    let employee = await Employee.findById(req.body.reviewTo);
    let review = await Review.create({
      review: req.body.review,
      reviewFrom: req.user,
      reviewTo: employee,
      star: req.body.star,
    });

    if (review) {
      let assign = await Assign.findById(req.body.assign);
      let current = await Employee.findByIdAndUpdate(req.user, {
        $pull: { assign: assign.id },
      });
      assign.remove();
      current.reviewbyme.push(review);
      current.save();
      employee.reviewtome.push(review);
      employee.save();
    }
    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};
