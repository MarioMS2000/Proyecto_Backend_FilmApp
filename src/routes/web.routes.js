const express = require("express");
const viewsController = require("../controllers/views.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");
const movieController = require('../controllers/movie.view.controller')
const authController = require('../controllers/auth.view.controller')

const router = express.Router();

// Publicas
router.get("/", viewsController.home);
router.get("/login", viewsController.login);
router.get("/signup", viewsController.signup);
router.post("/login", authController.login);
router.post("/signup", authController.register);
// router.get("/restorepassword", authController.restorePassword);

// Privadas
router.get("/dashboard", requireAuth, viewsController.dashboard);
router.get("/profile", requireAuth, viewsController.profile);
router.get("/movies", requireAuth, movieController.showMovies);

// Usuario
router.get("/search", requireAuth, requireRole("user"), viewsController.search);
router.get("/search/:title", requireAuth, requireRole("user"), viewsController.movieDetail);

// Admin
router.get("/users", requireAuth, requireRole("admin"), viewsController.users);
router.get("/admin-movies", requireAuth, requireRole("admin"), viewsController.adminMovies)
router.get("/admin-movies/:id", requireAuth, requireRole("admin"), viewsController.adminEditMovie)
router.get("/admin-create-movie", requireAuth, requireRole("admin"), viewsController.adminCreateMovie)
router.get("/admin-create-user", requireAuth, requireRole("admin"), viewsController.adminCreateUser)
router.post("/admin-movies/:id", requireAuth, requireRole("admin"), movieController.updateMovie)
router.post("/admin-movies/delete/:id", requireAuth, requireRole("admin"), movieController.deleteMovie)
router.post("/admin-create-movie", requireAuth, requireRole("admin"), movieController.createMovie)
router.post("/admin-create-user", requireAuth, requireRole("admin"), authController.adminCreateUser)



module.exports = router;
