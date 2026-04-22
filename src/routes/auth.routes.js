const express = require("express");
const {
    register,
    login,
    logout,
    updatePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/update_password", updatePassword);

module.exports = router;
