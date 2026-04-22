const express = require("express");
const { register, login, updatePassword, showRegister,showLogin, logout } = require("../controllers/auth.controller");
const { requireAuth } = require('../middlewares/auth.middleware')

const router = express.Router();

router.get("/register", showRegister);
router.get("/login", showLogin);
router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/updatePassword', requireAuth, updatePassword)



module.exports = router;
