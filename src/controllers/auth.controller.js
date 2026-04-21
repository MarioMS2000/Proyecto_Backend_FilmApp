const authService = require("../services/auth.service");
const { createAccessToken } = require("../services/token.service");
const { accessTokenCookieOptions } = require("../config/cookie.config");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).render("pages/login", {
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
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

const logout = (_req, res) => {
  res.clearCookie("accessToken", accessTokenCookieOptions);
  return res.status(200).json({ message: "Sesion cerrada" });
};

const showRegister = (_req, res) => {
  res.render("pages/register", { message: "" });
};

const showLogin = (_req, res) => {
  res.render("pages/login", { message: "" });
};

module.exports = {
  register,
  login,
  logout,
  showRegister,
  showLogin,
};
