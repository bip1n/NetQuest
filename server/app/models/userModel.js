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
        default: "https://www.bing.com/images/search?view=detailV2&ccid=p4Binqfm&id=86C1A49D42F8FAB94BF95CC251038EE6284242BA&thid=OIP.p4BinqfmsC6mRfp9CsDTUwHaHa&mediaurl=https%3a%2f%2fwww.pngkey.com%2fpng%2ffull%2f503-5035055_a-festival-celebrating-tractors-profile-picture-placeholder-round.png&cdnurl=https%3a%2f%2fth.bing.com%2fth%2fid%2fR.a780629ea7e6b02ea645fa7d0ac0d353%3frik%3dukJCKOaOA1HCXA%26pid%3dImgRaw%26r%3d0&exph=565&expw=565&q=png+item+profile&simid=608006119625684397&FORM=IRPRST&ck=8025A5D4505BBC90880E6B03E836358D&selectedIndex=14&itb=1",
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
