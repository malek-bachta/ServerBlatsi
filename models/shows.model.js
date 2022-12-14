const mongoose = require("mongoose");

const showsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    date: {
        type: String,
        required: false,
    },
    genre: {
        type: String,
        required: true,
    },
   
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
   
    place: {
        type: String,
        required: false,
    },
   
    actors: {
        type: String,
        required: false,
    },
});

const shows = mongoose.model("shows", showsSchema);

module.exports = { shows };
