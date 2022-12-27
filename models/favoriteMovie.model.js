const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  idMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavoriteMovie = mongoose.model("FavoriteMovies", favoriteSchema);

module.exports = { FavoriteMovie };