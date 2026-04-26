const requireRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden" });
    }

    return next();
  };
};

const requireWebRole = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      // La web redirige a una pagina segura si el usuario no tiene permisos.
      return res.redirect("/movies");
    }

    return next();
  };
};

module.exports = {
  requireRole,
  requireWebRole,
};
