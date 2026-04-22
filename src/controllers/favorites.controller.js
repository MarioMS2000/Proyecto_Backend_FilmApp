const favoritesService = require("../services/favorites.service");

const getFavorites = (req, res) => {
  const favorites = favoritesService.getAll(req.user);
  return res.status(200).json(favorites);
};

const addFavorite = (req, res) => {
  return res.status(201).json({
    message: "Favorite pending implementation",
    payload: req.body,
  });
};

const removeFavorite = (req, res) => {
  return res.status(200).json({
    message: "Favorite removal pending implementation",
    id: req.params.id,
  });
};

module.exports = {
  getFavorites,
  addFavorite,
  removeFavorite,
};
