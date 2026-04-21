const { verifyAccessToken } = require("../services/token.service");

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;
  const bearerToken = authHeader?.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : null;

  return req.cookies?.accessToken || bearerToken;
};

const requireAuth = (req, res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    req.user = verifyAccessToken(token);
    return next();
  } catch (error) {
    return res.status(403).json({ message: "Forbidden" });
  }
};

module.exports = {
  requireAuth,
};
