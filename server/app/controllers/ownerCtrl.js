require('dotenv').config();
const Owner = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const venue = require("../models/venueModel");

const ownerCtrl = {
    viewprofile: async (req, res) => {
        try {
          const owner_id = req.user.id
          if (!owner_id) { return res.status(400).json({ error: "Owner ID is required." })};
          const owner = await Owner.findById(owner_id);
          if (!owner) { return res.status(400).json({ error: "Owner does not exist." });}
          const venues = await venue.findOne({ owner_id });
          if (!venues) { return res.status(400).json({ error: "Venue does not exist." });}
          const venueStatus = await VenueStatus.findOne({ owner_id });
          if (!venueStatus) { return res.status(400).json({ error: "Venue Status does not exist." });}

          venueName = owner.venueName;
          phone = owner.phone;
          address = owner.location;
          mapCoord = owner.mapCoord;
          opensAt = venues.openat;
          closesAt = venues.closeat;
          amenities = venues.amenities;

          const response = {
            venueName,
            phone,
            address,
            mapCoord,
            opensAt,
            closesAt,
            amenities
          };

          return res.status(200).json(response);
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    VenueDetails: async (req, res) => {
        try {
            const owner_id = req.query.id;
            if (!owner_id) { return res.status(400).json({ error: "Owner ID is required." })};
            const owner = await Owner.findById(owner_id);
            if (!owner) { return res.status(400).json({ error: "Owner does not exist." });}
            const venues = await venue.findOne({ owner_id });
            if (!venues) { return res.status(400).json({ error: "Venue does not exist." });}
            const venueStatus = await VenueStatus.findOne({ owner_id });
            if (!venueStatus) { return res.status(400).json({ error: "Venue Status does not exist." });}

            const phone = owner.phone;
            const address = owner.mapCoord;
            const amenities = venues.amenities;
            const startingPrice = venues.minprice; 
            const status = venueStatus.status;
            const response = {
                phone,
                address,
                amenities,
                startingPrice,
                status
            };
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
            if (!venues) { return res.status(400).json({ error: "Venue does not exist." });}
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


    updateProfile: async (req, res) => {
      try {
          const owner_id = req.user.id;
          if (!owner_id) {
              return res.status(400).json({ error: "Owner ID is required." });
          }
  
          const { username, contact, location, mapsCoordinate, opensAt, closesAt, features } = req.body;
          
  
          // Find the owner by ID
          const owner = await Owner.findById(owner_id);
          if (!owner) {
              return res.status(404).json({ error: "Owner does not exist." });
          }

          console.log(owner)
  
          // Update owner information
          owner.fullname = username;
          owner.phone = contact;
          // owner.location = location;
          owner.mapCoord = mapsCoordinate;
         

          console.log(owner.phone)
          console.log(owner.fullname)
          console.log(owner.mapCoord)

         
          await owner.save();

          console.log(username,contact,mapsCoordinate)
  
          // Find the venue by owner_id
          const venues = await venue.findOne({ owner_id });
          if (!venues) {
              return res.status(404).json({ error: "Venue does not exist." });
          }

          // Update venue information
          if (features) venues.amenities = features;
          if (opensAt) venues.openat = opensAt;
          if (closesAt) venues.closeat = closesAt;
          await venues.save();
  
          return res.status(200).json({ message: "Profile updated successfully!" });
      } catch (error) {
          console.error("Error:", error);
          return res.status(500).json({ error: error.message });
      }
    },
  
  


    savemedia: async (req, res) => {
        try {
          const id = req.user.id;
          const image = req.body.image;
          imagesaved, videosaved = false, false
          if (image){
            const venues = await venue.findOne({ owner_id: id });
            if (!venues) return res.status(400).json({error: "Venue does not exist."});
            venues.images.push(image);
            await venues.save();
            imagessaved = true
          }
          const video = req.body.video;
          if (video){
            const venues = await venue.findOne({ owner_id: id });
            if (!venues) return res.status(400).json({error: "Venue does not exist."});
            venues.videos.push(video);
            await venues.save();
            videosaved = true
          }
          if (imagesaved || videosaved){
            return res.status(200).json({error: "Success!"});
          }else{
            return res.status(400).json({error: "No media to save!"});
          }
        } catch (error) {
          return res.status(500).json({ msg: err.message });
        }
    },

    savestatus: async (req, res) => {
      try {
        const amenities = req.body.amenities;
      } catch (error) {
        return res.status(500).json({ msg: err.message });
      }
    },

}

module.exports = ownerCtrl;




