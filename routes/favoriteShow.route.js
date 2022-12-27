const express = require("express");
const router = express.Router();
const favoriteController = require("../controllers/favoriteShow.controller");



router.post("/all", favoriteController.FavoritefindByUser);
router.post("/add", favoriteController.AddFavorite);
router.post("/verif", favoriteController.VerifFavorite);
router.post("/delete", favoriteController.FavoriteDelete);


module.exports = router;
