const { getMovieReviews } = require("../services/scraping.service");
const {searchMovie,getMovieByIdService,getRandomMovies} = require("../services/movie.service");
const Movie = require("../models/mongo/Movie");

//USERS buscar peli
const showMovies = async (req, res) => {
  //búsqueda desde URL, API, sino en mongo
  const title = req.query.title;
  let movies = [];
  //si el usuario busca y muestra resultados
  if (title) {
    const results = await searchMovie(title);

    movies = results.map((movie) => ({
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
      director: movie.director || movie.Director,
      genre: movie.genre || movie.Genre,
      duration: movie.duration || movie.Runtime,
      imdbID: movie.imdbID,
    }));
  } else {
    //si no busca por título, muestra aleatorias
    const randomMovies = await getRandomMovies();

    movies = randomMovies.map((movie) => ({
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
      director: movie.director || movie.Director,
      genre: movie.genre || movie.Genre,
      duration: movie.duration || movie.Runtime,
      imdbID: movie.imdbID,
    }));
  }
  return res.render("pages/movies", {
    pageTitle: "Películas",
    movies,
    error: "Error al cargar las películas",
  });
};

// detalles de la pelí
const showMovieDetail = async (req, res) => {
  // Obtiene el ID de la película desde la URL
  const imdbID = req.params.id;
  //Si no hay ID vuelve al listado de películas
  if (!imdbID) return res.redirect("/movies");

  //Busca la película en OMDb o Mongo
  const movie = await getMovieByIdService(imdbID);

  // Si no encuentra la película, muestra la vista de listado con error
  if (!movie) {
    return res.render("pages/movies", {
      pageTitle: "Películas",
      movies: [],
      error: "No se encontró la película",
    });
  }
  let reviews = [];
  let reviewsError = null;
  try {
    // Obtiene las reviews por título de la película
    reviews = await getMovieReviews(movie.title || movie.Title);
  } catch (error) {
    // Si falla la API de reviews, guarda el error
    reviewsError = "No se pudieron cargar las reviews";
  }
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
  // Renderiza la vista de detalle de película
  return res.render("pages/movie-detail", {
    pageTitle: response.title,
    movie: response,
    reviewsError,
  });
};;
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
  showMovies,
  showMovieDetail,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMoviesController,
};
