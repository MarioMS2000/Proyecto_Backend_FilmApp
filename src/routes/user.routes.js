const express = require("express");
const {
  getAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUser,
  getProfile,
  updateProfile,
} = require("../controllers/users.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

// User
router.get("/", requireAuth, getProfile);
router.put("/", requireAuth, updateProfile);

// Admin
router.get("/all", requireAuth, requireRole("admin"), getAllUsers);
router.post("/", requireAuth, requireRole("admin"), createUser);


module.exports = router;
