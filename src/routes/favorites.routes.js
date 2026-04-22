const express = require("express");
const { getFavorites, 
        addFavorite, 
        removeFavorite } = require("../controllers/favorites.controller");
        
const { requireAuth } = require("../middlewares/auth.middleware");
const { requireRole } = require("../middlewares/role.middleware");

const router = express.Router();

// CRUD Fav
router.get("/", requireAuth, getFavorites);
router.post("/", requireAuth, addFavorite);
router.delete("/:id", requireAuth, removeFavorite);

module.exports = router;
