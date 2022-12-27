const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteMovie.controller");



router.post("/FavoritefindByUser", favoriteController.FavoritefindByUser);
router.post("/add", favoriteController.AddFavorite);
router.post("/verif", favoriteController.VerifFavorite);
router.post("/delete", favoriteController.FavoriteDelete);


module.exports = router;
