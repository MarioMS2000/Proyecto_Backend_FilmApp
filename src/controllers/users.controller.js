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

const getAllUsers = async ( req, res) => {
  const users = await userService.getAllUsers()
  return res.status(200).json(users);
};

const createUser = (req, res) => {
  return res.status(201).json({
    message: "User creation pending implementation",
    payload: req.body,
  });
};





module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  createUser,
};
