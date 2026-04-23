const {searchMovie,getMovieByIdService,getRandomMovies} = require("../services/movie.service");
const { getMovieReviews } = require("../services/scraping.service");

//view de pelis API y buscador
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
    }));
  }
  return res.render("pages/movies", {
    pageTitle: "Películas",
    movies,
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
      reviews,
    };
    return res.render("pages/movie-detail", {
      pageTitle: response.title,
      movie: response,
      reviewsError,
    });
};

module.exports = {
    showMovies,
    showMovieDetail,
}