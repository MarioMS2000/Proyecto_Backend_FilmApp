function roleMiddleware(role) {
  return (req, res, next) => {
    req.requiredRole = role;
    next();
  };
}

module.exports = roleMiddleware;
