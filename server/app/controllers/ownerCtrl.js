const Admin = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const venue = require("../models/venueModel");



const ownerCtrl = {
    viewprofile: async (req, res) => {
        try {

            const {owner_id} = req.body;
            const owner = await Admin.findOne({owner_id});
            if (!owner) return res.status(400).json({error: "Owner does not exist."});

            const venues = await venue.find({owner_id});
            if (!venues) return res.status(400).json({error: "Venue does not exist."});

            const venueStatus = await VenueStatus.find({owner_id});
            if (!venueStatus) return res.status(400).json({error: "Venue Status does not exist."});

            return res.status(200).json({owner, venues});

          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },


}

module.exports = ownerCtrl;




