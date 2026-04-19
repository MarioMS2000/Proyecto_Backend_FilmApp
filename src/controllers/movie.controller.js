const {searchMovie,getMovieByIdService} = require("../services/movie.service");
const Movie = require("../models/mongo/Movie")

//USERS buscar peli
const searchMovies = async (req,res) => {
  try {
    const title = req.query.title;
    const movies = await searchMovie(title);

    const response = movies.map((movie) => {
      return {
        title: movie.title || movie.Title,
        year: movie.year || movie.Released,
        poster: movie.poster || movie.Poster,
        director: movie.director || movie.Director,
        genre: movie.genre || movie.Genre,
        duration: movie.duration || movie.Runtime,
      };
    });
    return res.status(200).json(response);

  } catch (error) {
    return res.status(500).json({
      message: "Error buscando películas",
    });
  }
}
module.exports = {
  searchMovies,
  
}