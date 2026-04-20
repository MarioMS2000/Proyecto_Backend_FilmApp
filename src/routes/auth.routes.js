const express = require("express");
const { register, showRegister,showLogin } = require("../controllers/auth.controller");

const router = express.Router();

router.get("/register", showRegister);
router.get("/login", showLogin);
router.post('/register', register)



module.exports = router;
