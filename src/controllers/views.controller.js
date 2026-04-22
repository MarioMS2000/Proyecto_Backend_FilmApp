const User = require("../models/sql/User");

const viewsController = {
  home(req, res) {
    res.render("pages/index", { message: "" });
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
    res.render("pages/profile", { user: req.user });
  },

  movies(req, res) {
    res.render("pages/movies", { user: req.user });
  },

  search(req, res) {
    res.render("pages/search", { user: req.user });
  },

  movieDetail(req, res) {
    res.render("pages/movie-detail", {
      user: req.user,
      title: req.params.title,
    });
  },

  async users(req, res) {
    const users = await User.findAll()
    res.render("pages/users", { users });
  },
};

module.exports = viewsController;
