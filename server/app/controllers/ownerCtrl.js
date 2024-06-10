const Owner = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const venue = require("../models/venueModel");

const ownerCtrl = {
    viewprofile: async (req, res) => {
        try {

            const {owner_id} = req.body;
            const owner = await Owner.findOne({owner_id});
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



    VenueDetails: async (req, res) => {
        try {
            // const owner_id = req.query.id;

            // console.log(owner_id);

            // if (!owner_id) {
            //     return res.status(400).json({ error: "Owner ID is required." });
            // }

            const owner_id = "66652659ce1faf2be165b1b2"; // Valid ObjectId as a string

            // const owner = await Owner.findOne({owner_id});
            // console.log("42:",owner);
            // if (!Owner){ 
            //     return res.status(400).json({error: "Owner does not exist."})
            // }

            const owner = await Owner.findById(owner_id);

            if (!owner) {
                return res.status(400).json({ error: "Owner does not exist." });
            }

            console.log("55:",owner);
            
            // Fetch the owner details
            // const owner = await Owner.findOne({ owner_id });
            // console.log(owner);
            // if (!owner) {
            //     return res.status(400).json({ error: "Owner does not exist." });
            // }

            // Fetch the venue details for the given owner_id
            const venues = await venue.find({ owner_id });
            if (!venues || venues.length === 0) {
                return res.status(400).json({ error: "Venue does not exist." });
            }

            // Fetch the venue status for the given owner_id
            const venueStatus = await VenueStatus.findOne({ owner_id });
            if (!venueStatus) {
                return res.status(400).json({ error: "Venue Status does not exist." });
            }

            // Extract the required details
            const phone = owner.phone;
            const address = owner.address;
            const amenities = venues.flatMap(v => v.amenities); // Assuming amenities is a list in each venue
            const startingPrice = venueStatus.minprice; // Or whatever field represents the starting price

            // Construct the response object
            const response = {
                phone,
                address,
                amenities,
                startingPrice,
                venueStatus: venueStatus.status // Assuming 'status' field exists in VenueStatus
            };

            console.log(response);

            // Send the response back to the client
            return res.status(200).json(response);

        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ msg: err.message });
        }
    },


}

module.exports = ownerCtrl;




