const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
    dateTime: {
        type: Date,  // Stores both date and time
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: 0,  // Ensure non-negative prices
    },
    altcontact:{
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'booked', 'unavailable'],  // Restrict to predefined statuses
        default: 'available',
    }
});

const bookingSchema = new mongoose.Schema({
    owner_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",  // Assuming you have an Owner model defined
        required: true,
    },
    timeSlots: [timeSlotSchema]  // Array of time slots
});

// Optional: Index to optimize queries by owner and datetime within time slots
bookingSchema.index({ owner_id: 1, "timeSlots.dateTime": 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
