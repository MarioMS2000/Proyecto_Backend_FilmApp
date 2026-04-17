const authController = {
  showLogin(req, res) {
    res.render("pages/login");
  },

  showRegister(req, res) {
    res.render("pages/register");
  },
};

module.exports = authController;
