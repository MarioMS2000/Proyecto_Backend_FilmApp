const express = require("express");
const {
    register,
    login,
    logout,
    changePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/changepassword", changePassword);

module.exports = router;
