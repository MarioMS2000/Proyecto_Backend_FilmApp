const User = require("../models/sql/User");
const userService = require("../services/user.service");

const showUsers = async (req, res) => {
  const users = await User.findAll();
  return res.render("pages/users", { user: req.user, users });
};

const showCreateUser = (req, res) => {
  return res.render("pages/admin-create-user", { user: req.user, message: "" });
};

const updateUserRole = async (req, res) => {
  await userService.updateUser({
    id: req.params.id,
    role: req.body.role,
  });

  return res.redirect("/admin/users");
};

const deleteUser = async (req, res) => {
  await userService.deleteUser({ id: req.params.id });
  return res.redirect("/admin/users");
};

module.exports = {
  showUsers,
  showCreateUser,
  updateUserRole,
  deleteUser,
};
