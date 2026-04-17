function hashPassword(password) {
  return `hashed-${password}`;
}

module.exports = {
  hashPassword,
};
