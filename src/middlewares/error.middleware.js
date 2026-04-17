function errorMiddleware(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  return res.status(err.status || 500).json({
    ok: false,
    message: err.message || "Error interno del servidor",
  });
}

module.exports = errorMiddleware;
