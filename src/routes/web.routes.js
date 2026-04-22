const express = require("express");
const viewsController = require("../controllers/views.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

// Express
const router = express.Router();

// Publicas
router.get("/", viewsController.home);
router.get("/login", viewsController.login);
router.get("/signup", viewsController.signup);
router.get("/changepassword", viewsController.changePassword);

// Privadas
router.get("/dashboard", requireAuth, viewsController.dashboard);
router.get("/profile", requireAuth, viewsController.profile);
router.get("/movies", requireAuth, viewsController.movies);

// Usuario
router.get("/search", requireAuth, requireRole("user"), viewsController.signup);
router.get("/search/:title", requireAuth, requireRole("user"), viewsController.signup);

// Admin
router.get("/users", requireAuth, requireRole("admin"), viewsController.users);

module.exports = router;
