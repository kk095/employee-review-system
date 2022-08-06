const express = require("express");
const router = express.Router();
const home_controller = require("../controller/home_controller");
const admin_controller = require("../controller/admin");

router.get("/dashboard", admin_controller.dashboard);
router.post("/add_employee", admin_controller.addEmployees);
router.get("/remove_employee/:id", admin_controller.removeEmployees);
router.post("/update_employee/:id", admin_controller.updateEmployees);
router.get("/view_employees/", admin_controller.viewEmployees);
router.get("/makeAdmin/:id", admin_controller.makeAdminEmployees);
router.post("/add_review", admin_controller.addReviews);
router.post("/update_review/:id", admin_controller.updateReviews);
// router.get("/get_review/:id", admin_controller.viewReviews);
router.post("/assign_review/", admin_controller.assignEmployeeToReview);

module.exports = router;
