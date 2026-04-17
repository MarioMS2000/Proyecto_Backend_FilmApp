const movieController = {
  index(req, res) {
    res.render("pages/movies");
  },

  search(req, res) {
    res.render("pages/search");
  },
};

module.exports = movieController;
