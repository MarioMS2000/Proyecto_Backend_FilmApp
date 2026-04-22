const express = require("express");
const { register,
        login,
        showRegister,
        showLogin,
        logout } = require("../controllers/auth.controller");

const router = express.Router();

router.post('/signup', register);
router.post('/login', login);
router.post('/logout', logout);
router.post('/changepassword', changepassword);

module.exports = router;
