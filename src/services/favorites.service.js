const Favorite = require("../models/sql/Favorite");

const getAllFavoritesMovies = async(userId) =>{
  return Favorite.findAll({
    where: {user_id: userId},
    order: [["created_at", "DESC"]],
  });
}

const addFavoriteMovie = async(userId, favoriteData) =>{
  
}

const removeFavoriteMovie = async(userId, favoriteId) => {

}

module.exports = {
  getAllFavoritesMovies,
  addFavoriteMovie,
  removeFavoriteMovie
};
