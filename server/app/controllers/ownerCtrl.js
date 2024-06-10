require('dotenv').config();
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
            const owner_id = req.query.id;


            if (!owner_id) {
                return res.status(400).json({ error: "Owner ID is required." });
            }

            const owner = await Owner.findById(owner_id);
            if (!owner) {
                return res.status(400).json({ error: "Owner does not exist." });
            }


            const venues = await venue.findOne({ owner_id });
            if (!venues) {
                return res.status(400).json({ error: "Venue does not exist." });
            }


            const venueStatus = await VenueStatus.findOne({ owner_id });
            if (!venueStatus) {
                return res.status(400).json({ error: "Venue Status does not exist." });
            }

            const phone = owner.phone;
            const address = owner.mapCoord;
            // const amenities = venues.amenities;
            const startingPrice = venues.minprice; 
            const status = venueStatus.status;
           
            if (process.env.DEBUG == 'development') {
                console.log(phone);
                console.log(address);
                // console.log(amenities); 
                console.log(startingPrice);
                console.log(status);
            }

            const amenities = [
                "WiFi",
                "Parking",
                "Food & Drinks",
                "Restrooms",
                // Add more amenities as needed
              ];

            // Construct the response object
            const response = {
                phone,
                address,
                amenities,
                startingPrice,
                status
            };


            // Send the response back to the client
            return res.status(200).json(response);

        } catch (err) {
            console.error('Error:', err);
            return res.status(500).json({ msg: err.message });
        }
    },


    viewphotos: async (req, res) => {
        try {

            const owner_id = req.query.id;
           
            const venues = await venue.findOne({ owner_id });
            if (!venues) {
                return res.status(400).json({ error: "Venue does not exist." });
            }

            const images = venues.images;
            const videos = venues.videos;

            const imageList = [
                {
                  title: "Orange",
                  img: "https://www.tarkettsportsindoor.com/wp-content/uploads/2019/10/futsal.jpg"
                },
                {
                  title: "Tangerine",
                  img: "https://5.imimg.com/data5/SELLER/Default/2021/5/EY/RW/SB/3103550/futsal-court-construction-500x500.jpg"
                },
                {
                  title: "Raspberry",
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNA4mvp6wXwuztfTY_ouy3oPDKxzlj8ZBcfQivfoRfE6NTR3FKssMpEvB1QvtvPiHmaIY&usqp=CAU"
                },
                {
                  title: "Lemon",
                  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4grFGjZRV1NI1eiubTlF4C1VkFV_cI9aDBA&s"
                }
              ];


            return res.status(200).json(imageList);

          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },
}

module.exports = ownerCtrl;




