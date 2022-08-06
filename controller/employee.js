const Employee = require("../models/employees");
const Review = require("../models/reviews");

module.exports.requiringReviews = function (req, res) {};

module.exports.submitReviews = async function (req, res) {
  try {
    let review = Review.create({
      review: req.body.review,
      reviewFrom: req.user,
      reviewTo: req.body.user,
      star: req.body.star,
    });

    return res.redirect("/");
  } catch (e) {
    console.log(e);
    return res.redirect("/");
  }
};
