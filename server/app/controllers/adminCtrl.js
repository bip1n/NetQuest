require('dotenv').config();
const Owner = require("../models/ownerModel");
const User = require("../models/userModel");
const Venue = require("../models/venueModel");
const Booking = require("../models/bookingSchema");
const Status = require("../models/statusModel");

const adminCtrl = {
    getPendingVenue: async (req, res) => {
        try {
            const pendingStatuses = await Status.find({ status: 'pending' });

            const ownerIds = pendingStatuses.map(status => status.owner_id);

            const venues = await Venue.find({ owner_id: { $in: ownerIds } });

            return res.status(200).json(venues);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    verifyVenue: async (req, res) => {
        try {
            const { venueId } = req.body;

            const status = await Status.findOne({ owner_id: venueId });

            status.status = 'verified';

            await status.save();

            return res.status(200).json({ msg: 'Venue verified successfully' });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    rejectVenue: async (req, res) => {
        try {
            const { venueId, adminComment } = req.body;

            const status = await Status.findOne({ owner_id: venueId });

            status.status = 'rejected';
            status.admin_comment = adminComment;

            await status.save();

            return res.status(200).json({ msg: 'Venue rejected successfully' });
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
