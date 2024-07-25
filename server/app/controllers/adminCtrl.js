require('dotenv').config();
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const Venue = require("../models/venueModel");
const Booking = require("../models/bookingSchema");
const venueStatus = require("../models/venueStatus");

const adminCtrl = {
    getPendingVenue: async (req, res) => {
        try {
            const pendingStatuses = await venueStatus.find({ status: 'pending' });

            const ownerIds = pendingStatuses.map(status => status.owner_id);

            const venues = await Venue.find({ owner_id: { $in: ownerIds } });

            const owners = await Owner.find({ _id: { $in: ownerIds } });

            const detailedVenues = venues.map(venue => {
                const owner = owners.find(owner => owner._id.toString() === venue.owner_id.toString());
                return {
                    _id: venue._id,
                    owner_id: venue.owner_id,
                    venueID: venue.venueID,
                    images: venue.images,
                    videos: venue.videos,
                    amenities: venue.amenities,
                    reviews: venue.reviews,
                    fullname: owner.fullname,
                    email: owner.email,
                    venueName: owner.venueName,
                    location: owner.location,
                    __v: venue.__v
                };
            });

            return res.status(200).json(detailedVenues);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    verifyVenue: async (req, res) => {
        try {
            const pendingStatuses = await venueStatus.find({ status: 'verified' });

            const ownerIds = pendingStatuses.map(status => status.owner_id);

            const venues = await Venue.find({ owner_id: { $in: ownerIds } });

            const owners = await Owner.find({ _id: { $in: ownerIds } });

            const detailedVenues = venues.map(venue => {
                const owner = owners.find(owner => owner._id.toString() === venue.owner_id.toString());
                return {
                    _id: venue._id,
                    owner_id: venue.owner_id,
                    venueID: venue.venueID,
                    images: venue.images,
                    videos: venue.videos,
                    amenities: venue.amenities,
                    reviews: venue.reviews,
                    fullname: owner.fullname,
                    email: owner.email,
                    venueName: owner.venueName,
                    location: owner.location,
                    __v: venue.__v
                };
            });

            return res.status(200).json(detailedVenues);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    rejectVenue: async (req, res) => {
        try {
            const pendingStatuses = await venueStatus.find({ status: 'rejected' });

            const ownerIds = pendingStatuses.map(status => status.owner_id);

            const venues = await Venue.find({ owner_id: { $in: ownerIds } });

            const owners = await Owner.find({ _id: { $in: ownerIds } });

            const detailedVenues = venues.map(venue => {
                const owner = owners.find(owner => owner._id.toString() === venue.owner_id.toString());
                return {
                    _id: venue._id,
                    owner_id: venue.owner_id,
                    venueID: venue.venueID,
                    images: venue.images,
                    videos: venue.videos,
                    amenities: venue.amenities,
                    reviews: venue.reviews,
                    fullname: owner.fullname,
                    email: owner.email,
                    venueName: owner.venueName,
                    location: owner.location,
                    __v: venue.__v
                };
            });

            return res.status(200).json(detailedVenues);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    viewData: async (req, res) => {
        try {
            const owners = await Owner.find();
            const users = await User.find();
            const venues = await Venue.find();
            const bookings = await Booking.find();

            return res.status(200).json({ owners, users, venues, bookings });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    changeStatus: async (req, res) => {
        try {
            const { venueId, status } = req.body;

            const venue = await Venue.findById(venueId);

            venue.status = status;

            await venue.save();

            return res.status(200).json({ msg: 'Venue status changed successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    admin_details: async (req, res) => {
        try {
          const bookings = await Booking.find();
          const owners = await Owner.find();
          const users = await User.find();
      
          const totalUsers = users.length;
          const registeredVenues = owners.length;
          const totalTransactions = bookings.reduce((acc, booking) => acc + booking.price, 0);
      
          const earningsMap = bookings.reduce((acc, booking) => {
            const ownerId = booking.owner_id.toString();
            if (!acc[ownerId]) {
              acc[ownerId] = 0;
            }
            acc[ownerId] += booking.price;
            return acc;
          }, {});
      
      
          const ownersMap = owners.reduce((acc, owner) => {
            acc[owner._id.toString()] = owner;
            return acc;
          }, {});
      
          const topEarningVenues = Object.keys(earningsMap).map(ownerId => {
            const owner = ownersMap[ownerId];
            return {
              name: owner.venueName,
              location: owner.location,
              earnings: earningsMap[ownerId],
              avatar: owner.profilepic,
              initials: owner.fullname.split(' ').map(name => name[0]).join('')
            };
          });
      
          topEarningVenues.sort((a, b) => b.earnings - a.earnings);
      
          return res.status(200).json({ totalTransactions, topEarningVenues, totalUsers, registeredVenues });
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
      },

      logsheet: async (req, res) => {
        try {
            const { venueId, timeline } = req.body;
            console.log(venueId)
            console.log(timeline)
            const venues = await Venue.findOne({ venueID: venueId });
            if (!venues) return res.status(400).json({ msg: "This venue does not exist." });
            const owner = await Owner.findOne({ _id: venues.owner_id });
    
            let from, to;
            const date = new Date();
            to = date.toISOString().split('T')[0];
    
            if (timeline == '1') {
                from = new Date(date.setDate(date.getDate() - 7)).toISOString().split('T')[0];
            } else if (timeline == '2') {
                from = new Date(date.setMonth(date.getMonth() - 1)).toISOString().split('T')[0];
            } else if (timeline == '3') {
                from = new Date(owner.joindate).toISOString().split('T')[0];
            }
    
            const venueDetails = {
                name: owner.venueName,
                pan: owner.panNumber,
                contact: owner.phone,
                owner: owner.fullname,
                from: from,
                to: to
            };
    
    
            const bookings = await Booking.find({
                owner_id: venues.owner_id,
                date: { $gte: venueDetails.from, $lte: venueDetails.to }
            });
        
            const bookingSummary = bookings.reduce((acc, booking) => {
                const bookingDate = booking.date.toISOString().split('T')[0];
                if (!acc[bookingDate]) {
                    acc[bookingDate] = {
                        totalShifts: 0,
                        totalAmount: 0
                    };
                }
                acc[bookingDate].totalShifts += 1;
                acc[bookingDate].totalAmount += booking.price;
                return acc;
            }, {});
    
            res.json({
                venueDetails,
                bookingSummary
            });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
    
      

};

module.exports = adminCtrl;
