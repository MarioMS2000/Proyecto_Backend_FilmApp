const favoritesService = require("../services/favorites.service");

const favoriteViewController = {

    // mostrar página
    async favorites(req, res) {
        try {
            // obtener favoritos del usuario
            const favorites = await favoritesService.getAllFavoritesMovies(req.user.id);
            // 2. renderizar la vista favorites.ejs
            return res.render("pages/favorites", { // pages/favorites -> ruta donde se encuentra el ejs de favoritos
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

    // crear favorito y redirigir
    async addFavorite(req, res) {
        try {
            await favoritesService.addFavoriteMovie(req.user.id, req.body);
            return res.redirect("/favorites");
        } catch (error) {
            // renderizamos la página y necesitamos pintar los datos para que no se rompa o no muestre nada, etc
            const favorites = await favoritesService.getAllFavoritesMovies(req.user.id);

            // si fallo por duplicado
            if (error.name === "SequelizeUniqueConstraintError") {
                // indicamos que hay conflicto res.status(409) y volvemos a cargar la pagina con render
                return res.status(409).render("pages/favorites", {
                    // pasamos datos a la vista
                    user: req.user,
                    favorites,
                    message: "Favorite already exists",
                });
            }

            // si no era el anterior error pasaría a este
            return res.status(500).render("pages/favorites", {
                user: req.user,
                favorites,
                message: "Error creating favorite",
            });
        }
    },

    // borrar favorito y redirigir
    async removeFavorite(req, res) {
        try {
            const deleteFavorite = await favoritesService.removeFavoriteMovie(
                req.user.id,
                req.params.id
            );

            // si no se puede borrar porque el favorito no existe
            if (!deleteFavorite) {
                // volvemos a renderizar la página para que se siga mostrando algo
                const favorites = await favoritesService.getAllFavoritesMovies(req.user.id);

                return res.status(404).render("pages/favorites", {
                    user: req.user,
                    favorites,
                    message: "Favorite not found",
                });
            }

            // si se borro lo redirigimos
            return res.redirect("/favorites");
        } catch (error) {
            // Volvemos a renderizar la pagina pintanto datos y mostrando mensaje
            const favorites = await favoritesService.getAllFavoritesMovies(req.user.id);

            return res.status(500).render("pages/favorites", {
                user: req.user,
                favorites,
                message: "Error removing favorite",
            });
        }
    },
};

module.exports = favoriteViewController;