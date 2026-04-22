const express = require("express");
const viewsController = require("../controllers/views.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

// Publicas
router.get("/", viewsController.home);
router.get("/login", viewsController.login);
router.get("/signup", viewsController.signup);
router.get("/restorepassword", viewsController.restorePassword);

// Privadas
router.get("/dashboard", requireAuth, viewsController.dashboard);
router.get("/profile", requireAuth, viewsController.profile);
router.get("/movies", requireAuth, viewsController.movies);

// Usuario
router.get("/search", requireAuth, requireRole("user"), viewsController.search);
router.get("/search/:title", requireAuth, requireRole("user"), viewsController.movieDetail);

// Admin
router.get("/users", requireAuth, requireRole("admin"), viewsController.users);

module.exports = router;
