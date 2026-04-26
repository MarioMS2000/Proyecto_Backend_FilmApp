const express = require("express");
const viewsController = require("../../controllers/views.controller");
const { requireWebAuth } = require("../../middlewares/auth.middleware");
const { requireWebRole } = require("../../middlewares/role.middleware");
const movieController = require('../../controllers/movie.view.controller')
const authController = require('../../controllers/auth.view.controller')
const favoriteViewController = require('../../controllers/favorite.view.controller')

const router = express.Router();

// Publicas
router.get("/", viewsController.home);
router.get("/login", viewsController.login);
router.get("/signup", viewsController.signup);
router.post("/login", authController.login);
router.post("/signup", authController.register);
// router.get("/restorepassword", authController.restorePassword);

// Privadas
router.get("/dashboard", requireWebAuth, viewsController.dashboard);
router.get("/profile", requireWebAuth, viewsController.profile);
router.post("/profile/password", requireWebAuth, authController.restorePassword);
router.get("/movies", requireWebAuth, movieController.showMovies);
router.get("/favorites", requireWebAuth, favoriteViewController.favorites);
router.post("/favorites", requireWebAuth, favoriteViewController.addFavorite);
router.post("/favorites/:id/delete", requireWebAuth, favoriteViewController.removeFavorite);
router.get("/movies/:id", requireWebAuth, movieController.showMovieDetail);

// Admin
router.get("/admin/users", requireWebAuth, requireWebRole("admin"), viewsController.users);
router.get("/admin/users/new", requireWebAuth, requireWebRole("admin"), viewsController.adminCreateUser)
router.post("/admin/users", requireWebAuth, requireWebRole("admin"), authController.adminCreateUser)
router.post("/admin/users/:id/role", requireWebAuth, requireWebRole("admin"), viewsController.updateUserByAdmin);
router.post("/admin/users/:id/delete", requireWebAuth, requireWebRole("admin"), viewsController.deleteUser);
router.get("/admin/movies", requireWebAuth, requireWebRole("admin"), viewsController.adminMovies)
router.get("/admin/movies/new", requireWebAuth, requireWebRole("admin"), viewsController.adminCreateMovie)
router.post("/admin/movies", requireWebAuth, requireWebRole("admin"), movieController.createMovie)
router.get("/admin/movies/:id/edit", requireWebAuth, requireWebRole("admin"), viewsController.adminEditMovie)
router.post("/admin/movies/:id", requireWebAuth, requireWebRole("admin"), movieController.updateMovie)
router.post("/admin/movies/:id/delete", requireWebAuth, requireWebRole("admin"), movieController.deleteMovie)



module.exports = router;
