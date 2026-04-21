const express = require("express");
const router = express.Router();
const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie,getRandomMoviesController} = require("../controllers/movie.controller");
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

//routes middlewares auth, admin

//user
router.get("/random", getRandomMoviesController);
router.get("/search", searchMovies);
router.get("/:title", getMovieByTitle);

//admin
router.get("/", getAllMovies);
router.post("/", requireAuth, requireRole("admin"), createMovie);
router.put("/:id", requireAuth, requireRole("admin"), updateMovie);
router.delete("/:id", requireAuth, requireRole("admin"), deleteMovie);


module.exports = router;
