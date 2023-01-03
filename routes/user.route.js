const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

const RequireLogin = require("../middleware/RequireLogin");

router.get("/all", RequireLogin, userController.index);
router.post("/login", userController.signin);
router.post("/register", userController.signup);
//
router.post("/SendCodeForgot", userController.SendCodeForgot); //  Send FogetCode
router.post("/VerifCodeForgot", userController.VerifCodeForgot); //  Verif FogetCode
router.post("/ChangePasswordForgot", userController.ChangePasswordForgot); //  Change Password Forget
//

module.exports = router;
