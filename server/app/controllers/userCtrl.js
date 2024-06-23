const User = require("../models/userModel");
const Admin = require("../models/ownerModel");
const Booking = require("../models/bookingSchema");


const userCtrl = {


    bookvenue: async (req, res) => {
        try {
            // const user_id = req.user.id;  // Assuming you have user id in req.user
            const { user_id, owner_id, date, price, time, altcontact } = req.body;
    
            // Validate required fields
            if (!user_id) return res.status(400).json({ error: "User ID is required." });
            if (!owner_id) return res.status(400).json({ error: "Owner ID is required." });
            if (!date) return res.status(400).json({ error: "Date is required." });
            if (!price) return res.status(400).json({ error: "Price is required." });
            if (!time) return res.status(400).json({ error: "Time is required." });
            if (!altcontact) return res.status(400).json({ error: "Alternative contact number is required." });
    
            // Validate User
            const user = await User.findById(user_id);
            if (!user) return res.status(404).json({ error: "User not found." });
    
            // Validate Admin
            const admin = await Admin.findById(owner_id);  // Assuming Admin ID is actually owner_id
            if (!admin) return res.status(404).json({ error: "Admin not found." });
    
            // Check for existing booking on the same date and time
            const conflictingBooking = await Booking.findOne({
                owner_id: owner_id,
                "timeSlots.date": new Date(date), // Match date
                "timeSlots.time": time            // Match time
            });
    
            if (conflictingBooking) {
                return res.status(409).json({ error: "A booking already exists for the specified date and time." });
            }
    
            // Create new booking
            const newBooking = new Booking({
                owner_id: owner_id,
                timeSlots: [
                    {
                        date: new Date(date),
                        time: time,
                        price: price,
                        altcontact: altcontact,
                        status: 'available',  // Default status or could be derived from input
                        user_id: user_id
                    }
                ]
            });
    
            // Save to the database
            await newBooking.save();
    
            // Return the created booking
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
        const { review, owner_id, user_id } = req.body;

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
            content: review.content, 
            upvotes: 0, 
            downvotes: 0,  
            createdAt: new Date()
        };

        const updatedVenue = await Venue.findOneAndUpdate(
            { owner_id: owner_id }, 
            { $push: { reviews: newReview } }, 
            { new: true, useFindAndModify: false } 
        );

        if (!updatedVenue) {
            return res.status(404).json({ msg: "Venue not found" });
        }

        // Return success response with the updated venue
        return res.status(200).json({ msg: "Review added!", venue: updatedVenue });

    } catch (err) {
        // Return error response if something goes wrong
        return res.status(500).json({ msg: err.message });
    }
  },
}

module.exports = userCtrl;




