const authController = require("../controller/auth");
const router = require("express").Router();

router.post("/create", authController.CreateUser);
router.post("/login", authController.LoginUser);

module.exports = router;
