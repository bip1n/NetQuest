const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming you have a User model defined
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    upvotes: {
        type: Number,
        default: 0,
    },
    downvotes: {
        type: Number,
        default: 0,
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
    images: [{
        type: String,
        required: true,
    }],
    videos: [{
        type: String,
        required: true,
    }],
    amenities: [{
        type: String,
        required: true,
    }],
    minprice: {
        type: Number,
        required: true,
    },
    reviews: [reviewSchema]  // Array of reviews
});

const Venue = mongoose.model('Venue', venueSchema);

module.exports = Venue;
