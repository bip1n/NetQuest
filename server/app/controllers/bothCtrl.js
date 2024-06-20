require('dotenv').config();
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");

const bothCtrl = {
    NavDetails: async (req, res) => {
        try {
            const id = req.user.id;

            // Try to find the owner by ID
            const owner = await Owner.findById(id);
            if (owner) {
                const response = {
                    username: owner.fullname,
                    avatar: owner.profilepic,
                };
                console.log("response:", response);
                return res.status(200).json({ user: response });
            }

            // If not found, try to find the user by ID
            const user = await User.findById(id);
            if (user) {
                const response = {
                    username: user.username,
                    avatar: user.profilepic,
                };
                return res.status(200).json({ user: response });
            }

            // If neither is found, return an error response
            return res.status(400).json({ msg: "User not found" });

        } catch (err) {
            // Catch any unexpected errors
            return res.status(500).json({ msg: err.message });
        }
    },

 

    // needed for the venue details page
    // venue id
    // venue imageurl
    // venue name
    // venue location

            //   const venue = await Owner.find().sort({$natural:1}).limit(5);

    getVenue: async (req, res) => {
        try {

            const owners = await Owner.find().select('-password -panNumber -fullname -mailverified, -email').limit(4);
            console.log("owners:", owners);
            return res.status(200).json({owners});
                        
          
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }

    },


    getVenueById: async (req, res) => {
        try {
            const id = req.params.id;
            const owner = await Owner.findById(id).select('-password -panNumber -fullname -mailverified, -email');
            return res.status(200).json({ owner });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },


};

module.exports = bothCtrl;
