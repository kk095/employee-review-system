const express = require("express");
const router = express.Router();
const home_controller = require("../controller/home_controller");
const employee_controller = require("../controller/employee");

router.get("/view", employee_controller.requiringReviews);
router.post("/submit_review", employee_controller.submitReviews);

module.exports = router;
