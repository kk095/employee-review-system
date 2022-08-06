const express = require("express");
const router = express.Router();
const home_controller = require("../controller/home_controller");
const passport = require("passport");

router.get("/", passport.checkAuthentication, home_controller.home);
router.get("/register", home_controller.register);
router.post("/create_employee", home_controller.create_employee);
router.post(
  "/login_employee",
  passport.authenticate("local", {
    failureRedirect: "/login",
  }),
  home_controller.register
);
router.get("/login", home_controller.login);
router.get("/signout", home_controller.signout);

router.use("/admin", require("./admin"));
router.use("/employee", require("./employee"));

module.exports = router;
