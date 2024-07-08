const mongoose = require("mongoose"); 

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming you have a User model defined
        required: true,
    },
    content: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const venueSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true,
    },
    venueID:{
        type: String,
        required: true,
        unique: true,
    },
    images: [{
        type: String,
    }],
    videos: [{
        type: String,
    }],
    amenities: [{
        type: String,
    }],
    openat: {
        type: {
            hour: Number,
            minute: Number
        },
    },
    closeat: {
        type: {
            hour: Number,
            minute: Number
        },
        },
    reviews: [reviewSchema]  // Array of reviews
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
