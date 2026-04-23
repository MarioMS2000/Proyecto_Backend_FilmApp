const Favorite = require("../models/sql/Favorite");

// GET
const getAllFavoritesMovies = async (userId) => {
  return Favorite.findAll({
    where: { user_id: userId },
    order: [["created_at", "DESC"]],
  });
}

// POST -> favoriteData = sourceType, sourceMovieId;
const addFavoriteMovie = async (userId, favoriteData) => {
  const { sourceType, sourceMovieId } = favoriteData;
  return Favorite.create({
    user_id: userId,
    sourceType,
    sourceMovieId,
  });
}

// DELETE
const removeFavoriteMovie = async (userId, favoriteId) => {
  const favorite = await Favorite.findOne({
    where: {
      id: favoriteId,
      user_id: userId,
    },
  });

  // si no encontró ningún favorito con ese id y ese user_id
  if(!favorite){
    return null;
  }

  await favorite.destroy();
  return favorite;
}

module.exports = {
  getAllFavoritesMovies,
  addFavoriteMovie,
  removeFavoriteMovie
};
