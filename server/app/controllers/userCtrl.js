const User = require("../models/userModel");
const Owner = require("../models/ownerModel");
const Booking = require("../models/bookingSchema");
const Venue = require("../models/venueModel");
const moment = require('moment');

const userCtrl = {

    bookvenue: async (req, res) => {
        try {

            const user_id = req.user.id
            const { owner_id, date, price, time, altcontact, pidx } = req.body;
            const dateObj = new Date(date);
            const formattedDate = dateObj.toISOString().slice(0, 10);

            console.log(user_id);
            console.log(owner_id);
            console.log(formattedDate);
            console.log(price);
            console.log(time);
            console.log(altcontact);
            console.log(pidx);
    
            if (!user_id) return res.status(400).json({ error: "User ID is required." });
            if (!owner_id) return res.status(400).json({ error: "Owner ID is required." });
            if (!formattedDate) return res.status(400).json({ error: "Date is required." });
            if (!price) return res.status(400).json({ error: "Price is required." });
            if (!time) return res.status(400).json({ error: "Time is required." });
            if (!altcontact) return res.status(400).json({ error: "Alternative contact number is required." });
    
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ error: "User not found." });

                const owner = await Owner.findById(owner_id); 
            if (!owner) return res.status(404).json({ error: "Owner not found." });
    
            const conflictingBooking = await Booking.findOne({
                owner_id: owner_id,
                date: new Date(formattedDate),  
                time: time         
            });
    
            if (conflictingBooking) {
                return res.status(409).json({ error: "A booking already exists for the specified date and time." });
            }
    
            const newBooking = new Booking({
                owner_id: owner_id,
                date: new Date(formattedDate),
                time: time,
                price: price,
                altcontact: altcontact,
                status: 'available', 
                user_id: user_id
            });
    
            await newBooking.save();
    
            return res.status(201).json(newBooking);
        } catch (err) {
            console.error(err);
            return res.status(500).json({ error: err.message });
        }
    },

    userprofile: async (req, res) => {
        try {
            const user_id = req.user.id
            console.log(user_id);
            if (!user_id) { return res.status(400).json({ error: "User ID is required." })};
            console.log("this1");
            const user = await User.findById(user_id).select('-password -mailverified -Bookedstatus -mailverified, -joindate');
            console.log("this2");
            if (!user) { return res.status(404).json({ error: "User not found." })};
            console.log(user);
            return res.status(200).json({ user });

        } catch (err) {
            return res.status(500).json({ msg: err.message });
          }
      },




    addreview: async (req, res) => {
      try {

        const user_id = req.user.id
        const { review, owner_id } = req.body;

        console.log(user_id);
        console.log(owner_id);
        console.log(review);

        if (!review || !owner_id || !user_id) {
            return res.status(400).json({ msg: "Missing required fields" });
        }

        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }
        
        const owner = await Owner.findById(owner_id);
        if (!owner) {
            return res.status(404).json({ msg: "Owner not found" });
        }


        const newReview = {
            user_id: user_id,
            content: review, 
            upvotes: 0, 
            downvotes: 0,  
            createdAt: new Date()
        };

        console.log(newReview);

        const updatedVenue = await Venue.findOneAndUpdate(
            { owner_id: owner_id }, 
            { $push: { reviews: newReview } }, 
            { new: true, useFindAndModify: false } 
        );

        if (!updatedVenue) {
            return res.status(404).json({ msg: "Venue not found" });
        }

        return res.status(200).json({ msg: "Review added!", venue: updatedVenue });

    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
  },

  getBooking: async (req, res) => {
    try {
        const user_id = req.user.id;

        if (!user_id) {
            return res.status(400).json({ error: "User ID is required." });
        }

        const bookings = await Booking.find({ user_id: user_id });

        if (bookings.length === 0) {
            return res.status(404).json({ error: "No bookings found." });
        }

        const now = moment();

        console.log("Now:", now);

        const pastBookings = [];
        const futureOrPresentBookings = [];

        const bookingPromises = bookings.map(async (booking) => {
            try {
                const owner = await Owner.findById(booking.owner_id);
                return {
                    ...booking._doc,  // Spread the booking document fields
                    venueName: owner.venueName,
                    location: owner.mapCoord,
                };
            } catch (err) {
                console.error(`Error fetching owner data for booking ID: ${booking._id}`, err);
                return {
                    ...booking._doc,  // Spread the booking document fields
                    venueName: 'Unknown',
                    location: 'Unknown',
                };
            }
        });

        const bookingsWithVenueDetails = await Promise.all(bookingPromises);

        bookingsWithVenueDetails.forEach(booking => {
            const bookingDate = moment(booking.date);

            console.log("Booking date:", bookingDate);

            const formattedDate = bookingDate.format('YYYY/MM/DD');
            const formattedTime = bookingDate.format('HH:mm');

            const formattedBooking = {
                ...booking,  // Spread the original booking fields
                formattedDate,
                formattedTime
            };

            if (bookingDate.isBefore(now)) { 
                pastBookings.push(formattedBooking);
            } else {
                futureOrPresentBookings.push(formattedBooking);
            }
        });

        console.log("Past bookings:", pastBookings);
        console.log("Future or present bookings:", futureOrPresentBookings);


        return res.status(200).json({
            pastBookings,
            futureOrPresentBookings
        });

    } catch (error) {
        return res.status(500).json({ msg: error.message });
    }
},


    getUserName: async (req, res) => {
        try {
            const user_id = req.user.id;

            if (!user_id) {
                return res.status(400).json({ error: "User ID is required." });
            }

            const user = await User.findById(user_id).select('username');

            if (!user) {
                return res.status(404).json({ error: "User not found." });
            }

            return res.status(200).json({ username: user });

        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }

    },

    isUserLoggedIn: async (req, res) => {
        try {
            return res.status(200).json({ msg: "User is logged in." });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },

    getReviews: async (req, res) => {
        try {
            const owner_id = req.params.id;
    
            // Find all venues with the specified owner_id
            const venues = await Venue.find({ owner_id });
    
            if (!venues.length) {
                return res.status(404).json({ msg: "No venues found for this owner." });
            }
    
            // Extract reviews from the venues
            const reviews = venues.reduce((acc, venue) => acc.concat(venue.reviews), []);
    
            // Fetch user details for each review
            const reviewsWithUserDetails = await Promise.all(reviews.map(async (review) => {
                const user = await User.findById(review.user_id);
                return {
                    ...review.toObject(),
                    user: user ? user.toObject() : null,
                };
            }));

            console.log(reviewsWithUserDetails)
    
            return res.status(200).json({ reviews: reviewsWithUserDetails });
        } catch (error) {
            return res.status(500).json({ msg: error.message });
        }
    },
}

module.exports = userCtrl;




