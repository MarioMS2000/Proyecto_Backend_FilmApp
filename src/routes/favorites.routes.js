const express = require("express");
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favorites.controller");

const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

// CRUD Fav
router.get("/", requireAuth, requireRole("user"), getFavorites);
router.post("/", requireAuth, requireRole("user"), addFavorite);
router.delete("/:id", requireAuth, requireRole("user"), removeFavorite);

module.exports = router;
