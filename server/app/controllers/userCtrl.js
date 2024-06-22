

const userCtrl = {


    bookvenue: async (req, res) => {
        try {
            
          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    userprofile: async (req, res) => {
        try {
            const user_id = req.user.id
            if (!user_id) { return res.status(400).json({ error: "User ID is required." })};
            const user = await User.findById(user_id).select('-password -mailverified -Bookedstatus -mailverified, -joindate');
            if (!user) { return res.status(404).json({ error: "User not found." })};
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




