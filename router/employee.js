const express = require("express");
const router = express.Router();
const passport = require("passport");
const home_controller = require("../controller/home_controller");
const employee_controller = require("../controller/employee");

router.get(
  "/view/:id",
  passport.checkAuthentication,
  employee_controller.requiringReviews
);
router.post(
  "/submit_review",
  passport.checkAuthentication,
  employee_controller.submitReviews
);

module.exports = router;
