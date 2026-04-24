const authService = require("../services/auth.service");
const { createAccessToken } = require("../services/token.service");
const { accessTokenCookieOptions } = require("../config/cookie.config");

const register = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.status(201).json({
        message: "User created",
        user: {
          name: user.name,
          email: user.email
        }
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

    return res.redirect("/");
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
    const user = await authService.updatePassword(req.body);
    return res.status(200).json({
      message: "Password changed successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    const user = await authService.register(req.body);

    return res.redirect("/users");
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
