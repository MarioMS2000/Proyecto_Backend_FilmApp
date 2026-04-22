const express = require("express");
const { getAllUsers,
    reateUser,
    updateUserByAdmin,
    deleteUser,
    getProfile,
    updateProfile } = require("../controllers/user.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

// User
router.get("/", requireAuth, getProfile);
// router.get("/", requireAuth, updateProfile);

// // Admin
// router.get("/all", requireAuth, requireRole("admin"), getAllUsers);
// router.get("/all", requireAuth, requireRole("admin"), createUser);
// router.get("/all", requireAuth, requireRole("admin"), updateUserByAdmin);
// router.get("/all", requireAuth, requireRole("admin"), deleteUser);



module.exports = router;