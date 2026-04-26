const Movie = require("../models/mongo/Movie");
const User = require("../models/sql/User");
const { getRandomMovies } = require("../services/movie.service");
const userService = require('../services/user.service')

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

  restorePassword(req, res) {
    res.render("pages/restorepassword", { message: "" });
  },

  dashboard(req, res) {
    res.render("pages/dashboard", { user: req.user });
  },

  profile(req, res) {
    res.render("pages/profile", { user: req.user, message: "" });
  },

  movies(req, res) {
    res.render("pages/movies", { user: req.user });
  },

  async adminMovies(req, res) {
    const movies = await Movie.find()
    res.render("pages/admin-movies", { movies });
  },

  async adminEditMovie(req, res) {
    const movie = await Movie.findById(req.params.id)
    res.render('pages/admin-edit-movie', {movie})
  },

  adminCreateMovie(req, res) {
    res.render('pages/admin-create-movie')
  },

  adminCreateUser(req, res) {
    res.render('pages/admin-create-user', {message: ""})
  },

  async users(req, res) {
    const users = await User.findAll()
    res.render("pages/users", { users });
  },

  async deleteUser(req, res) {
    const deleted = await userService.deleteUser({ id: req.params.id })
    return res.redirect('/admin/users')
  },

  async updateUserByAdmin(req, res) {
    const user = await userService.updateUser({
      id: req.params.id,
      role: req.body.role,
    })

    return res.redirect('/admin/users')
  }
};

module.exports = viewsController;
