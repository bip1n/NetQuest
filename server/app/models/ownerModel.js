const mongoose = require("mongoose");

const ownerSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 25,
    },
    phone: {
        type: Number,
        required: true,
        unique: true,
    },
    venueName: {
        type: String,
        required: true,
    },
    panNumber: {
        type: Number,
        required: true,
    },
    mapCoord: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    location: {
        type: String,
        // required: true,
    },
    password: {
        type: String,
        required: true,
    },
    mailverified:{
        type: Boolean,
        default : false
    },
    joindate:{
        type: Date,
        default: Date.now
    }
});

const Owner = mongoose.model('Owner', ownerSchema);

module.exports = Owner;
