const jwt = require("jsonwebtoken");

const getAccessTokenSecret = () => {
  const secret = process.env.ACCESS_TOKEN_SECRET;

  if (!secret) {
    throw new Error("ACCESS_TOKEN_SECRET is not configured");
  }

  return secret;
};

const createAccessToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    getAccessTokenSecret(),
    { expiresIn: "20m" }
  );
};

const verifyAccessToken = (token) => {
  return jwt.verify(token, getAccessTokenSecret());
};

module.exports = {
  createAccessToken,
  verifyAccessToken,
};
