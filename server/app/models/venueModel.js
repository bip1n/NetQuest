const mongoose = require("mongoose");

const venueSchema = new mongoose.Schema({
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Admin",
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

