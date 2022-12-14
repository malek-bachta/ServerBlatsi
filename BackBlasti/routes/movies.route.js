const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies.controller");



router.get("/all", moviesController.ShowMovies);
router.post("/add", moviesController.AddMovie);
router.post("/update", moviesController.UpdateMovie);
router.delete("/delete", moviesController.deletem);


module.exports = router;
