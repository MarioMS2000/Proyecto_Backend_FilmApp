const userService = require("../services/user.service");

const getProfile = (req, res) => {
  return res.status(200).json({
    message: "Authenticated user profile",
    user: req.user,
  });
};

const updateProfile = (req, res) => {
  return res.status(200).json({
    message: "Profile update pending implementation",
    payload: req.body,
  });
};

const getAllUsers = (_req, res) => {
  return res.status(200).json(userService.getAllUsers());
};

const createUser = (req, res) => {
  return res.status(201).json({
    message: "User creation pending implementation",
    payload: req.body,
  });
};

const updateUserByAdmin = (req, res) => {
  const user = userService.updateUser(req.body)

  return res.redirect('/users')
};

const deleteUser = async (req, res) => {
  const deleted = await userService.deleteUser(req.body)
  return res.redirect('/users')
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUser,
};
