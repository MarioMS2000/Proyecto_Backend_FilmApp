const User = require("../models/sql/User");

const getAllUsers = async () => {
  const users = await User.findAll()

  return users
}

const updateUser = async ({id, role}) => {
  const user = await User.findOne({where: {id}})

  user.update({role})

  return user
}

const deleteUser = async ({id}) => {
  const user = await User.findOne({where: {id}})

  await user.destroy()
  return true
}

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser
};