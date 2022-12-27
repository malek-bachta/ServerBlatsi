const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  idShow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shows",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavoriteShow = mongoose.model("FavoriteShows", favoriteSchema);

module.exports = { FavoriteShow };