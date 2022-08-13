const express = require("express");
const router = express.Router();
const passport = require("passport");
const home_controller = require("../controller/home_controller");
const admin_controller = require("../controller/admin");

router.get(
  "/dashboard/:id",
  passport.checkAuthentication,
  admin_controller.dashboard
);
router.get("/remove_employee/:id", admin_controller.removeEmployees);
router.get(
  "/view_employees/",
  passport.checkAuthentication,
  admin_controller.viewEmployees
);
router.get("/makeAdmin/:id", admin_controller.makeAdminEmployees);
router.get(
  "/update_review/:id/:review/:reviewid",
  admin_controller.updateReviews
);
router.get("/assign_page", admin_controller.reviewPage);
router.post("/assign_review/", admin_controller.assignEmployeeToReview);
router.get("/Delete_assign/:id/:assign", admin_controller.removeAssign);

module.exports = router;
