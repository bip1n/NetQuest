const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    videos: [{
        type: String,
        required: true,
    }],
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;

 