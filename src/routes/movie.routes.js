const express = require("express");
const router = express.Router();
const { searchMovies,
        getMovieByTitle,
        getAllMovies,
        createMovie,
        updateMovie,
        deleteMovie,
        getRandomMoviesController } = require("../controllers/movie.controller");

const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

// User
router.get("/random", requireAuth, requireRole("user"), getRandomMoviesController);
router.get("/search", requireAuth, requireRole("user"), searchMovies);
router.get("/search/:title", requireAuth, requireRole("user"), getMovieByTitle);

// Admin
router.get("/", requireAuth, requireRole("admin"), getAllMovies);
router.post("/", requireAuth, requireRole("admin"), createMovie);
router.put("/:id", requireAuth, requireRole("admin"), updateMovie);
router.delete("/:id", requireAuth, requireRole("admin"), deleteMovie);


module.exports = router;
