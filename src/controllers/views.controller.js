const { getRandomMovies } = require("../services/movie.service");

const fallbackMovie = {
  title: "Film App",
  year: "2026",
  genre: "Tu proxima historia",
  poster:
    "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=900&q=80",
};

const viewsController = {
  async home(req, res) {
    let featuredMovie = fallbackMovie;

    try {
      const movies = await getRandomMovies();
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];

      if (randomMovie) {
        featuredMovie = {
          title: randomMovie.title || randomMovie.Title || fallbackMovie.title,
          year: randomMovie.year || randomMovie.Year || fallbackMovie.year,
          genre: randomMovie.genre || randomMovie.Genre || fallbackMovie.genre,
          poster:
            randomMovie.poster ||
            randomMovie.Poster ||
            fallbackMovie.poster,
        };
      }
    } catch (error) {
      featuredMovie = fallbackMovie;
    }

    res.render("pages/index", {
      message: "",
      featuredMovie,
    });
  },

  login(req, res) {
    res.render("pages/login", { message: "" });
  },

  signup(req, res) {
    res.render("pages/register", { message: "" });
  },

  dashboard(req, res) {
    res.render("pages/dashboard", { user: req.user });
  },

  profile(req, res) {
    res.render("pages/profile", { user: req.user, message: "" });
  }
};

module.exports = viewsController;
