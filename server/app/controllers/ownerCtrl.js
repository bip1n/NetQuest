require('dotenv').config();
const Owner = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const venue = require("../models/venueModel");
const cloudinary = require("../utils/cloudinary");


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
            const imageList = [];
            const videoList = [];
            images.forEach((image) => {
              imageList.push({ type: 'image', url: image });
            });
            videos.forEach((video) => {
              videoList.push({ type: 'video', url: video });
            });
            imageList.push(...videoList);
            const mediaList = imageList;
            return res.status(200).json(mediaList);
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
          owner.location = location;
          owner.mapCoord = mapsCoordinate;
         
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
          const media = req.files['media'];
        
          if (!media) {return res.status(400).json({ error: "media are required." });}
          const owner = await Owner.findById(id);
          if (!owner) {return res.status(400).json({ error: "Owner does not exist." });}
          const venues = await venue.findOne({ owner_id: id });
          if (!venues) {return res.status(400).json({ error: "Venue does not exist." });}
          const images = [];
          const videos = [];
          media.forEach((file) => {
            if (file.mimetype.includes("image")) {
              images.push(file);
            } else if (file.mimetype.includes("video")) {
              videos.push(file);
            }
          });

       
          if (images.length === 0 && videos.length === 0) {
            return res.status(400).json({ error: "At least one image or video is required." });
          }

          
          let imageUrls = [];
          let videoUrls = [];
          
          // Upload images if they are available
          if (images.length > 0) {
            imageUrls = await Promise.all(images.map(async (file) => {
              const result = await cloudinary.uploader.upload(file.path, { folder: 'venue_images_pub' });
              return result.secure_url;
            }));
            venues.images = imageUrls;
          }
          
          // Upload videos if they are available
          if (videos.length > 0) {
            videoUrls = await Promise.all(videos.map(async (file) => {
              const result = await cloudinary.uploader.upload(file.path, { folder: 'venue_videos_pub', resource_type: 'video' });
              return result.secure_url;
            }));
            venues.videos = videoUrls;
          }
  
          await venues.save();
          return res.status(200).json({ message: "Media saved successfully!" });
        } catch (error) {
          return res.status(500).json({ msg: error.message });
        }
    },

}

module.exports = ownerCtrl;




