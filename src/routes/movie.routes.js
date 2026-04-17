const express = require("express");
const movieController = require("../controllers/movie.controller");

const router = express.Router();

router.get("/", movieController.index);
router.get("/search", movieController.search);

module.exports = router;
