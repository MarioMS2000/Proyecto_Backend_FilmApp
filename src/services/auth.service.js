const bcrypt = require("bcryptjs");
const User = require("../models/sql/User");

const register = async ({ name, email, password, password2 }) => {
  if (!email || !name || !password) {
    throw new Error("Email, name and password required");
  }

  if (password !== password2) {
    throw new Error("Passwords do not match");
  }

  const existingUser = await User.findOne({ where: { email } });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  return User.create({
    name,
    email,
    password: passwordHash,
    role: "user",
  });
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw new Error("Email and password required");
  }

  const user = await User.findOne({ where: { email } });

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid email or password");
  }

  return user;
};

const updatePassword = async ({id, password, newPassword, newPassword2}) => {
  const user = await User.findOne({where: {id}})
  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new Error("Invalid password")
  }

  if (!newPassword || newPassword !== newPassword2) {
    throw new Error("New password dosen't match")
  }

  const updatedPassword = await bcrypt.hash(newPassword, 10)
  await user.update({password: updatedPassword})

  return user
}

module.exports = {
  register,
  login,
  updatePassword
};
