const userService = require("../services/user.service");
const authService = require("../services/auth.service");

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

const createUser = async (req, res) => {
  const user = await authService.register(req.body);

  return res.status(201).json({
    message: "User created",
    user: {
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
};

const updateUserByAdmin = async (req, res) => {
  const user = await userService.updateUser({
    id: req.params.id,
    role: req.body.role,
  });

  return res.status(200).json(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUser({ id: req.params.id });

  return res.status(200).json({ message: "User deleted" });
};




module.exports = {
  getProfile,
  updateProfile,
  getAllUsers,
  createUser,
  updateUserByAdmin,
  deleteUser,
};
