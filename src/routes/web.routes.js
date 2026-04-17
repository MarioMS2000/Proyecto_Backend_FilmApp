const express = require("express");
const viewsController = require("../controllers/views.controller");

const router = express.Router();

router.get("/", viewsController.home);

module.exports = router;
