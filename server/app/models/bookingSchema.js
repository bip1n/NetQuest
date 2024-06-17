const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema({
    date: {
        type: Date,  // Stores only the date part
        required: true,
    },
    time: {
        type: String,  // Stores the time part as a string in HH:MM format
        required: true,
        validate: {
            validator: function(v) {
                return /\b([01]?[0-9]|2[0-3]):[0-5][0-9]\b/.test(v);  // Validates HH:MM format
            },
            message: props => `${props.value} is not a valid time format!`
        }
    },
    price: {
        type: Number,
        required: true,
        min: 0,  // Ensure non-negative prices
    },
    altcontact: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['available', 'reserved', 'booked', 'unavailable'],  // Restrict to predefined statuses
        default: 'available',
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",  // Assuming you have a User model defined
    },
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
bookingSchema.index({ owner_id: 1, "timeSlots.date": 1, "timeSlots.time": 1 });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
