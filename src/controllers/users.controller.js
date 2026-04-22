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
  return res.status(200).json(userService.getAll());
};

const createUser = (req, res) => {
  return res.status(201).json({
    message: "User creation pending implementation",
    payload: req.body,
  });
};

const updateUserByAdmin = (req, res) => {
  return res.status(200).json({
    message: "Admin user update pending implementation",
    id: req.params.id,
    payload: req.body,
  });
};

const deleteUser = (req, res) => {
  return res.status(200).json({
    message: "User deletion pending implementation",
    id: req.params.id,
  });
};

module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUser,
};
