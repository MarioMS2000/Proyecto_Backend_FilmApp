const express = require("express");
const {
  register,
  login,
  logout,
  restorePassword,
} = require("../controllers/auth.view.controller");

const router = express.Router();

router.post("/signup", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/restorepassword", restorePassword);

module.exports = router;
