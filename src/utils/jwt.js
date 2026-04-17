function signToken(payload) {
  return `token-${JSON.stringify(payload)}`;
}

module.exports = {
  signToken,
};
