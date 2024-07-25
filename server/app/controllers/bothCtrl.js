require('dotenv').config();
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const venue = require("../models/venueModel");
const Booking = require("../models/bookingSchema");

const bothCtrl = {
    NavDetails: async (req, res) => {
        try {
            const id = req.user.id;
            const owner = await Owner.findById(id);
            if (owner) {
                const response = {
                    username: owner.fullname,
                    avatar: owner.profilepic,
                    role: "owner",
                };
                return res.status(200).json({ user: response });
            }

            const user = await User.findById(id);
            if (user) {
                const response = {
                    username: user.username,
                    avatar: user.profilepic,
                    role: "user",
                };
                return res.status(200).json({ user: response });
            }

            return res.status(400).json({ msg: "User not found" });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
 
    getVenue: async (req, res) => {
        try {

            const owners = await Owner.find().select('-password -panNumber -fullname -mailverified, -email').limit(4);
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


    getVenueSlots: async (req, res) => {
        try {
            const owner_id = req.params.id;
            const date = req.query.date;
            const venues = await venue.findOne({ owner_id });
            if (!venues) { return res.status(400).json({ error: "Venue does not exist." });}
    
            const opensAt = venues.openat.hour;
            const closesAt = venues.closeat.hour;
    
            const bookings = await Booking.find({ owner_id: owner_id ,date: new Date(date) });

    
            const bookedSlots = bookings.map(booking => ({
                time: booking.time,
                status: booking.status,
                price : booking.price,
                user_id: booking.user_id
            }));
    
            return res.status(200).json({
                venue: venue.name,
                date: date,
                opensAt: opensAt,
                closesAt: closesAt,
                bookedSlots: bookedSlots
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    }, 


};

module.exports = bothCtrl;
