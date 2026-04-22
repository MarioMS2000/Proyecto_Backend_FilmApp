const viewsController = {
  home(req, res) {
    res.render("pages/index");
  },

  login(req, res) {
    res.render("pages/login");
  },
  signup(req, res) {
    res.render("pages/register");
  },
  changePassword(req, res) {
    res.render("pendiente");
  },
  dashboard(req, res) {
    res.render("pendiente");
  },
  profile(req, res) {
    res.render("pendiente");
  },
  movies(req, res) {
    res.render("pages/movies");
  },
  search(req, res) {
    res.render("pages/search");
  },
  useres(req, res) {
    res.render("pages/users");
  }
};

module.exports = viewsController;
