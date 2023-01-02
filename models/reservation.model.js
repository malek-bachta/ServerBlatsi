const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
   idEvent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "events",
    },

    idMovie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "movies",
    },

    idShow: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "shows",
    },

    idUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    },

    seats: {
        type: String,
        required: true,
    },




});

const reservation = mongoose.model("reservation", reservationSchema);

module.exports = { reservation };
