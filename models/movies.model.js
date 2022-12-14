const mongoose = require("mongoose");

const moviesSchema = mongoose.Schema({
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
    language: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    video: {  
        type: String,
        required: false,
    },
    rating: {
        type: String,
        required: false,
    },
    duration: {
        type: String,
        required: false,
    },
    director: {
        type: String,
        required: false,
    },
    writer: {
        type: String,
        required: false,
    },
    production: {
        type: String,
        required: false,
    },
});

const movies = mongoose.model("movies", moviesSchema);

module.exports = { movies };
