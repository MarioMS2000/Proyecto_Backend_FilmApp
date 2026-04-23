const express = require("express");
const router = express.Router();

const {showMovies,showMovieDetail} = require("../controllers/movieHome.views.controller");

const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

// Home películas random y buscador
router.get("/movies", requireAuth, requireRole("user"), showMovies);

// Detalle película
router.get("/movies/:id", requireAuth, requireRole("user"), showMovieDetail);

module.exports = router;