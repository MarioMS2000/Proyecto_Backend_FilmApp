const express = require("express");
const router = express.Router();
const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie} = require("../controllers/movie.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

//routes middlewares auth, admin

//user
router.get("/search", searchMovies);
router.get("/search/:title", getMovieByTitle);

//admin
router.get("/movies", getAllMovies);
router.post("/api/movie", requireAuth, requireRole("admin"), createMovie);
router.put("/api/movie/:id", requireAuth, requireRole("admin"), updateMovie);
router.delete("/api/movie/:id", requireAuth, requireRole("admin"), deleteMovie);

module.exports = router;
