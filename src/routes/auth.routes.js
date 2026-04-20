const express = require("express");
const { register, login, showRegister,showLogin, logout } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/register", showRegister);
router.get("/login", showLogin);
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)



module.exports = router;
