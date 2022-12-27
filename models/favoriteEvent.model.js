const mongoose = require("mongoose");

const favoriteSchema = mongoose.Schema({
  idEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
  },
  idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const FavoriteEvent = mongoose.model("FavoriteEvents", favoriteSchema);

module.exports = { FavoriteEvent };