const favoritesService = require("../services/favorites.service");
const { getMovieByIdService } = require("../services/movie.service");

const hydrateFavorite = async (favorite) => {
  const movie = await getMovieByIdService(favorite.sourceMovieId);

  return {
    id: favorite.id,
    sourceType: favorite.sourceType,
    sourceMovieId: favorite.sourceMovieId,
    movie,
  };
};

const getHydratedFavorites = async (userId) => {
  const favorites = await favoritesService.getAllFavoritesMovies(userId);
  return Promise.all(favorites.map(hydrateFavorite));
};

const favoriteViewController = {
  async favorites(req, res) {
    try {
      const favorites = await getHydratedFavorites(req.user.id);

      return res.render("pages/favorites", {
        user: req.user,
        favorites,
        message: "",
      });
    } catch (error) {
      return res.status(500).render("pages/favorites", {
        user: req.user,
        favorites: [],
        message: "Error loading favorites",
      });
    }
  },

  async addFavorite(req, res) {
    const returnTo = req.body.returnTo || req.get("Referrer") || "/movies";

    try {
      await favoritesService.addFavoriteMovie(req.user.id, req.body);
      return res.redirect(returnTo);
    } catch (error) {
      if (error.name === "SequelizeUniqueConstraintError") {
        return res.redirect(returnTo);
      }

      const favorites = await getHydratedFavorites(req.user.id);

      return res.status(500).render("pages/favorites", {
        user: req.user,
        favorites,
        message: "Error creating favorite",
      });
    }
  },

  async removeFavorite(req, res) {
    try {
      const deleteFavorite = await favoritesService.removeFavoriteMovie(
        req.user.id,
        req.params.id
      );

      if (!deleteFavorite) {
        const favorites = await getHydratedFavorites(req.user.id);

        return res.status(404).render("pages/favorites", {
          user: req.user,
          favorites,
          message: "Favorite not found",
        });
      }

      return res.redirect("/favorites");
    } catch (error) {
      const favorites = await getHydratedFavorites(req.user.id);

      return res.status(500).render("pages/favorites", {
        user: req.user,
        favorites,
        message: "Error removing favorite",
      });
    }
  },
};

module.exports = favoriteViewController;
