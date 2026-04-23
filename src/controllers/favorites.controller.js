const favoritesService = require("../services/favorites.service");

// GET
const getFavorites = async (req, res) => {
  try {
    const favorites = await favoritesService.getAllFavoritesMovies(req.user.id);
    return res.status(200).json(favorites);
  } catch (error) {
    return res.status(500).json({
      message: "Error getting favorites",
    });
  }
};

// POST | req.user.id: dato del usuario autenticado, req.body: datos enviados por el cliente
const addFavorite = async (req, res) => {
  try {
    const favorite = await favoritesService.addFavoriteMovie(req.user.id, req.body);
    return res.status(201).json(favorite);
  } catch (error) {
    // Si hay errores por duplicado | SequelizeUniqueConstraintError -> es un objeto errro del propio Sequelize
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(409).json({
        message: "Favorite already exists",
      });
    }
    // Si no es el anterior error, lanzamos el 500
    return res.status(500).json({
      message: "Error creating favorite",
    });
  }
};

// DELETE
const removeFavorite = async (req, res) => {
  try {
    const deleteFavorite = await favoritesService.removeFavoriteMovie(
      req.user.id,
      req.params.id
    );

    if (!deleteFavorite) {
      return res.status(404).json({
        message: "Favorite not found",
      });
    }

    return res.status(200).json({
      message: "Favorite removed",
      favorite: deleteFavorite,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error removing favorite",
    });
  }
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
