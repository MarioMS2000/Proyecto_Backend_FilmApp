

const { getMovieReviews } = require("../services/scraping.service");
const {searchMovie,getMovieByIdService,getRandomMovies} = require("../services/movie.service");
const Movie = require("../models/mongo/Movie");

//USERS buscar peli
const searchMovies = async (req, res) => {
  try {
    const title = req.query.title;

    if (!title) {
      return res.status(400).json({
        message: "El título es requerido",
      });
    }
    const movies = await searchMovie(title);

    const response = movies.map((movie) => {
      return {
        title: movie.title || movie.Title,
        poster: movie.poster || movie.Poster,
        year: movie.year || movie.Year,
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
};

//añadir el ranting
const getMovieByTitle = async (req, res) => {
  try {
    const title = req.params.title;
    const movies = await searchMovie(title);

    if (!movies || movies.length === 0) {
      return res.status(404).json({
        message: "Película no encontrada",
      });
    }
    const movie = movies[0];

    const reviews = await getMovieReviews(movie.title || movie.Title);

    const response = {
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
      director: movie.director || movie.Director,
      genre: movie.genre || movie.Genre,
      duration: movie.duration || movie.Runtime,
      plot: movie.plot || movie.Plot,
      actors: movie.actors || movie.Actors,
      rating: movie.imdbRating,
      reviews,
    };
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Error obteniendo detalle de película",
    });
  }
};
//admin get movies
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return res.status(500).json({
      message: "Error obteniendo películas",
    });
  }
};

const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.redirect("/admin-movies")
  } catch (error) {
    return res.status(500).json({
      message: "Error creando película",
    });
  }
};

const updateMovie = async (req, res) => {
  try {
    const update = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!update) {
      return res.status(404).json({
        message: "Película no encontrada",
      });
    }
    return res.redirect("/admin-movies")
  } catch (error) {
    return res.status(500).json({
      message: "Error actualizando película",
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const deleted = await Movie.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        message: "Película no encontrada",
      });
    }
    return res.redirect("/admin-movies")

  } catch (error) {
    return res.status(500).json({
      message: "Error eliminando película",
    });
  }
};

const getRandomMoviesController = async (req, res) => {
  try {
    const movies = await getRandomMovies();

    const response = movies.map((movie) => ({
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
      director: movie.director || movie.Director,
      genre: movie.genre || movie.Genre,
      duration: movie.duration || movie.Runtime,
    }));
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      message: "Error obteniendo películas aleatorias",
    });
  }
};
module.exports = {
  searchMovies,
  getMovieByTitle,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMoviesController,
};
