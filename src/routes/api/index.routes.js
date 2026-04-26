const express = require("express");

const authRoutes = require("./auth.routes");
const userRoutes = require("./user.routes");
const movieRoutes = require("./movie.routes");
const favoritesRoutes = require("./favorites.routes");

const router = express.Router();

// Punto unico de entrada para endpoints API: /api/...
router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/movies", movieRoutes);
router.use("/favorites", favoritesRoutes);

module.exports = router;
