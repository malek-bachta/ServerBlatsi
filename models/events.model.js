const mongoose = require("mongoose");


const eventsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    adress: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    cost: {
        type: String,
        required: false,
    }, 
    description: {
        type: String,
        required: false,
    },

    date: {
        type: String,
        required: false,
    },
    guest: {
        type: String,
        required: false,
    },
    pAvailable: {
        type: String,
        required: false,
    },
    image: {
        type: String,
        required: false,
    },


});

const events = mongoose.model("events", eventsSchema);

module.exports = { events };