const { getMovieReviews } = require("../services/scraping.service");
const {searchMovie,getMovieByIdService,getRandomMovies} = require("../services/movie.service");
const Movie = require("../models/mongo/Movie");

//USERS buscar peli
const showMovies = async (req, res) => {
  //búsqueda desde URL, API, sino en mongo
  const title = req.query.title;
  let movies = [];

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
      // La vista manda este origen al crear el favorito.
      sourceType: movie.source === "mongo" ? "MONGO" : "OMDB",
    }));
  } else {
    const randomMovies = await getRandomMovies();

    movies = randomMovies.map((movie) => ({
      title: movie.title || movie.Title,
      poster: movie.poster || movie.Poster,
      year: movie.year || movie.Year,
      director: movie.director || movie.Director,
      genre: movie.genre || movie.Genre,
      duration: movie.duration || movie.Runtime,
      imdbID: movie.imdbID,
      sourceType: movie.source === "mongo" ? "MONGO" : "OMDB",
    }));
  }
  return res.render("pages/movies", {
    pageTitle: "Películas",
    movies,
    error: ""
  });
};

// detalles de la pelí
const showMovieDetail = async (req, res) => {
    const imdbID = req.params.id;
    
    if (!imdbID) return res.redirect("/movies");

    const movie = await getMovieByIdService(imdbID);

    if(!movie){
       return res.render("pages/movies", {
         pageTitle: "Películas",
         movies: [],
         error: "No se encontró la película",
       });
    }
    let reviews = [];
    let reviewsError = null;
    try {
      reviews = await getMovieReviews(movie.title || movie.Title);
    } catch (error) {
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
      imdbID: movie.imdbID || imdbID,
      sourceType: movie.source === "mongo" ? "MONGO" : "OMDB",
      reviews,
    };
    return res.render("pages/movie-detail", {
      pageTitle: response.title,
      movie: response,
      reviewsError,
    });
};
const createMovie = async (req, res) => {
  try {
    const movie = await Movie.create(req.body);
    return res.redirect("/admin/movies")
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
    return res.redirect("/admin/movies")
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
    return res.redirect("/admin/movies")

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
