require('dotenv').config();
const axios = require('axios');
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const venue = require("../models/venueModel");
const venueStatus = require("../models/venueStatus");
const Booking = require("../models/bookingSchema");
const request = require('request');

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
            const verifiedVenues = await venueStatus.find({ isActivated: true }).limit();
    
            const ownerIds = verifiedVenues.map(venue => venue.owner_id);

    
            const owners = await Owner.find({ _id: { $in: ownerIds } })
                                      .select('-password -panNumber -fullname -mailverified -email')
                                      .limit(8);
        
            return res.status(200).json({ owners });
        } catch (err) {
            // Handle errors
            return res.status(500).json({ msg: err.message });
        }
    },
    

    getVenueById: async (req, res) => {
        try {
            const id = req.params.id;
            const owner = await Owner.findById(id).select('-password -panNumber -fullname -mailverified -email');
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
            if (!venues) { return res.status(400).json({ error: "Venue does not exist." }); }

            const opensAt = venues.openat.hour;
            const closesAt = venues.closeat.hour;

            const bookings = await Booking.find({ owner_id: owner_id, date: new Date(date) });

            const bookedSlots = bookings.map(booking => ({
                time: booking.time,
                status: booking.status,
                price: booking.price,
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

    khaltiResponse: async (req, res) => {
        try {
            const {
                pidx,
                transaction_id,
                tidx,
                amount,
                total_amount,
                mobile,
                status,
                purchase_order_id,
                purchase_order_name
            } = req.query;

            const payload = {
                pidx,
                transaction_id,
                tidx,
                amount,
                total_amount,
                mobile,
                status,
                purchase_order_id,
                purchase_order_name
            };

            const options = {
                method: 'POST',
                url: 'https://a.khalti.com/api/v2/epayment/lookup/',
                headers: {
                    'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
                    'Content-Type': 'application/json',
                },
                data: payload
            };

            const response = await axios(options);
            const responseBody = response.data;
            console.log(response.status);

            if (response.status === 200) {
                if (responseBody.status === 'Completed') {
                    await changeStatus(pidx, 'booked');
                }
                return res.status(200).json(responseBody);
            } else {
                console.log('Error:', response);
                return res.status(200).json(responseBody);
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    verifyPayment: async (req, res) => {
        try{
            const { pidx } = req.body;
            const payload = { pidx };
        
            const options = {
                method: 'POST',
                url: 'https://a.khalti.com/api/v2/epayment/lookup/',
                headers: {
                    'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            };
        
            request(options, (error, response) => {
                if (error) throw new Error(error);
        
                if (response.statusCode === 200) {
                    const result = JSON.parse(response.body);
                    return res.render('paymentSuccess', {
                        message: 'Payment successful',
                        paymentDetails: result
                    });
                } else {
                    return res.status(200).json(JSON.parse(response.body));
                }
            });

        }catch(err){
            return res.status(500).json({ msg: err.message });
        }
    },

    khaltiPayment: async (req, res) => {
        try{
            const payload = req.body;
            var options = {
            'method': 'POST',
            'url': 'https://a.khalti.com/api/v2/epayment/initiate/',
            'headers': {
            'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
            };
            request(options, function (error, response) {
                if (error) throw new Error(error);
                if (response.statusCode == 200) {
                    return res.status(200).json(JSON.parse(response.body));
                }else{
                    return res.status(400).json(JSON.parse(response.body));
                }
            })
        }catch(err){
            return res.status(500).json({ msg: err.message });
        }
    }
};

async function changeStatus(pidx, status) {
    try {
        const bookings = await Booking.find({ pidx: pidx });
        bookings.forEach(async (booking) => {
            booking.status = status;
            await booking.save();
        });
    } catch (err) {
        console.error("Error updating booking status:", err);
    }
}

module.exports = bothCtrl;
