const express = require("express");
const {
  register,
  login,
  logout,
  restorePassword,
} = require("../controllers/auth.controller");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.put("/restorepassword", restorePassword);

module.exports = router;
