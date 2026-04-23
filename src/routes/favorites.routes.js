const express = require("express");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favorites.controller");

const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");
const favoritesValidator = require("../validators/favorites.validator");

const router = express.Router();

// CRUD Fav
router.get("/", requireAuth, requireRole("user"), getFavorites);
router.post("/", requireAuth, requireRole("user"), favoritesValidator, addFavorite);
router.delete("/:id", requireAuth, requireRole("user"), removeFavorite);

module.exports = router;
