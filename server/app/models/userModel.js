const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
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
    mailverified:{
        type: Boolean,
        default : false
    },
    Bookedstatus:{ // history of booking
        type: Boolean,
        default: false,
    },
    joindate:{
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
