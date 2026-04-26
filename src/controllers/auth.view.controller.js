const authService = require("../services/auth.service");
const { createAccessToken } = require("../services/token.service");
const { accessTokenCookieOptions } = require("../config/cookie.config");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.redirect("/login");
  } catch (error) {
    return res.render("pages/register", { message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await authService.login(req.body);
    const accessToken = createAccessToken(user);

    res.cookie("accessToken", accessToken, accessTokenCookieOptions);

    return res.redirect("/movies");
  } catch (error) {
    return res.render("pages/login", { message: error.message });
  }
};

const logout = ( req, res) => {
  res.clearCookie("accessToken", accessTokenCookieOptions);
  return res.redirect("/");
};

const restorePassword = async (req, res) => {
  try {
    await authService.updatePassword(req.body);

    return res.render("pages/profile", {
      user: req.user,
      message: "Password changed successfully",
    });
  } catch (error) {
    return res.status(400).render("pages/profile", {
      user: req.user,
      message: error.message,
    });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.redirect("/admin/users");
  } catch (error) {
    return res.render("pages/register", { message: error.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  restorePassword,
  adminCreateUser
};
