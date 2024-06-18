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
    profilepic: {
        type: String,
        default: "https://cdn.discordapp.com/attachments/863302870852960266/1252498827861164072/OIP_3.jpg?ex=66726fee&is=66711e6e&hm=93421b662dff6740b867959ceee44594818747bed875f9e2fb01548e34108991&",
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
