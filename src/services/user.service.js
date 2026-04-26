const User = require("../models/sql/User");

const getAllUsers = async () => {
  const users = await User.findAll()

  return users
}

const updateUser = async ({id, role}) => {
  const user = await User.findOne({where: {id}})

  if (!user) {
    throw new Error("User not found")
  }

  await user.update({role})

  return user
}

const deleteUser = async ({id}) => {
  const user = await User.findOne({where: {id}})

  if (!user) {
    throw new Error("User not found")
  }

  await user.destroy()
  return true
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};
