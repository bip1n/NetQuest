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
};

module.exports = adminCtrl;
