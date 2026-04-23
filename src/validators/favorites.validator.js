//  Su trabajo es revisar req.body antes de que la petición llegue al controller
function favoritesValidator(req, res, next) {
  const { sourceType, sourceMovieId } = req.body;

  // Si falta alguno de estos campos
  if (!sourceType || !sourceMovieId) {
    return res.status(400).json({
      message: "sourceType and sourceMovieId are required",
    });
  }

  // Aquí validas que sourceType solo tenga uno de esos dos valores permitidos
  if (!["OMDB", "MONGO"].includes(sourceType)) { // ¿sourceType está dentro de este array? -> "OMDB", "MONGO" -> válido "NETFLIX" -> inválido "omdb" -> inválido
    return res.status(400).json({
      message: "sourceType must be OMDB or MONGO",
    });
  }

  // Comprobamos que sourceMovieId sea un string y que no esté vacío ni contenga solo espacios
  if (typeof sourceMovieId !== "string" || !sourceMovieId.trim()) {
    return res.status(400).json({
      message: "sourceMovieId must be a valid string",
    });
  }

  // Todo validado, sigue con la ruta
  return next();
}

module.exports = favoritesValidator;
