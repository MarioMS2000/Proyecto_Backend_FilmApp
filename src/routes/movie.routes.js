const express = require("express");
const router = express.Router();
const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie} = require("../controllers/movie.controller");

//routes middlewares auth, admin

//user
router.get("/search", searchMovies);
router.get("/search/:title", getMovieByTitle);

//admin
router.get("/movies", isAuth, isAdmin, getAllMovies);
router.post("/api/movie", isAuth, isAdmin, createMovie);
router.put("/api/movie/:id", isAuth, isAdmin, updateMovie);
router.delete("/api/movie/:id", isAuth, isAdmin, deleteMovie);

module.exports = router;
