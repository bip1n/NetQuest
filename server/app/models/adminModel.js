const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
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
    password: {
        type: String,
        required: true,
    },
    joindate:{
        type: Date,
        default: Date.now
    
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
