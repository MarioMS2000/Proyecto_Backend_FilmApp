const express = require("express");
const router = express.Router();
const {searchMovies,getMovieByTitle,getAllMovies,createMovie,updateMovie,deleteMovie} = require("../controllers/movie.controller");

//routes middlewares auth, admin

//user
router.get("/search", searchMovies);
router.get("/:title", getMovieByTitle);

//admin
router.get("/", /* isAuth, isAdmin, */ getAllMovies);
router.post("/", /* isAuth, isAdmin, */ createMovie);
router.put("/:id", /* isAuth, isAdmin, */ updateMovie);
router.delete("/:id", /* isAuth, isAdmin, */ deleteMovie);

module.exports = router;
