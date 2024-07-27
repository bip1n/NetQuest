require('dotenv').config();
const Owner = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const venue = require("../models/venueModel");
const cloudinary = require("../utils/cloudinary");
const Booking = require("../models/bookingSchema");
const user = require("../models/userModel");


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
        const { owner_id } = req.query;

        if (owner_id == 'undefined' || !owner_id) {
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
        const Venues = owner.venueName;
        const fullname = owner.fullname;
        const email = owner.email;
        const location = owner.location;
        const panNumber = owner.panNumber;
        const profilepic = owner.profilepic;
        const registerdate = owner.joindate;
        const defaultRate = 800;

        const media = [
            ...venues.images.map(image => ({ type: 'image', url: image })),
            ...venues.videos.map(video => ({ type: 'video', url: video })),
            ...venueStatus.images.map(image => ({ type: 'image', url: image })),
            ...venueStatus.videos.map(video => ({ type: 'video', url: video }))
        ];

        const venueID = venues.venueID;
        const amenities = venues.amenities;
        const startingPrice = venues.minprice;
        const status = venueStatus.status;

        const response = {
            phone,
            address,
            amenities,
            startingPrice,
            status,
            Venues,
            fullname,
            email,
            location,
            panNumber,
            profilepic,
            registerdate,
            defaultRate,
            venueID,
            media
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

  
          // Update owner information
          owner.fullname = username;
          owner.phone = contact;
          owner.location = location;
          owner.mapCoord = mapsCoordinate;
         
          await owner.save();

  
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

    venuedata: async (req, res) => {
      try {
          const owner_id = req.user.id;
          if (!owner_id) {
              return res.status(400).json({ error: "Owner ID is required." });
          }
  
          const bookings = await Booking.find({ owner_id });
          
          // Initialize variables
          let totalRevenue = 0;
          const userIds = new Set(); // To keep track of unique user_ids
  
          // Calculate total revenue and collect unique user_ids
          bookings.forEach(booking => {
              totalRevenue += booking.price;
              userIds.add(booking.user_id.toString()); // Convert to string to ensure uniqueness
          });
  
          // Calculate the results
          const totalUsers = userIds.size;
          const totalBookings = bookings.length;
  
          // Create the response object
          const response = {
              revenue: totalRevenue,
              totalUsers: totalUsers,
              totalBookings: totalBookings
          };
  
          return res.status(200).json(response);
      } catch (err) {
          return res.status(500).json({ msg: err.message });
      }
  },

  ongoingbooking: async (req, res) => {
    try {
      const owner_id = req.user.id;
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
      
      // Get current date and time
      const now = new Date();
      const today = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format: HH:MM
  
      // Fetch bookings for the owner
      const bookings = await Booking.find({ owner_id });
      
      // Filter bookings to include only those for today with time greater than or equal to current time
      const ongoingBookings = bookings.filter(booking => {
        const bookingDate = booking.date.toISOString().split('T')[0];
        const bookingTime = booking.time;
        
        return bookingDate === today && bookingTime >= currentTime;
      });
      
      // Sort ongoing bookings by time in ascending order
      ongoingBookings.sort((a, b) => {
        const timeA = a.time.split(':').map(Number);
        const timeB = b.time.split(':').map(Number);
        
        return timeA[0] - timeB[0] || timeA[1] - timeB[1];
      });
      
      // Return filtered and sorted ongoing bookings
      return res.status(200).json({ bookings: ongoingBookings });
      
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  recentbooking: async (req, res) => {
    try {
      const owner_id = req.user.id;
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
  
      // Get current date and time
      const now = new Date();
      const today = now.toISOString().split('T')[0]; // Format: YYYY-MM-DD
      const currentTime = now.toTimeString().split(' ')[0].substring(0, 5); // Format: HH:MM

  
      // Fetch all bookings for the owner
      const bookings = await Booking.find({ owner_id });

  
      
      // Filter future bookings from today onwards
      const futureBookings = bookings.filter(booking => {
        const bookingDate = booking.date.toISOString().split('T')[0];
        const bookingTime = booking.time;
  
        // Convert bookingTime and currentTime to comparable formats (HHMM)
        const bookingTimeFormatted = bookingTime.replace(':', '');
        const currentTimeFormatted = currentTime.replace(':', '');
  
        // Return bookings that are today and time is after or equal to current time
        // or bookings that are for future dates
        return (bookingDate > today) || (bookingDate === today && bookingTimeFormatted >= currentTimeFormatted);
      });
        

      // Sort bookings by date, time, and bookedAt
      futureBookings.sort((a, b) => {
        const dateComparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        if (dateComparison === 0) {
          const timeComparison = a.time.localeCompare(b.time);
          if (timeComparison === 0) {
            return new Date(b.bookedAt).getTime() - new Date(a.bookedAt).getTime();
          }
          return timeComparison;
        }
        return dateComparison;
      });
  

      // Fetch user data for each booking
      const userIds = futureBookings.map(booking => booking.user_id);
      const users = await user.find({ _id: { $in: userIds } }).lean();
  
      // Map user data to bookings
      const recentBookings = futureBookings.map(booking => {
        const user = users.find(user => user._id.equals(booking.user_id));
        return {
          customer: {
            name: user.username,
            contact: user.phone,
            avatarUrl: user.profilepic
          },
          date: booking.date.toISOString().split('T')[0],
          time: booking.time,
          price: booking.price
        };
      });
  
      // Return filtered and sorted future bookings with user data
      return res.status(200).json({ recentBookings });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  bookingdetails: async (req, res) => {
    try {
      const owner_id = req.user.id;
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
  
      const { date } = req.query;
      if (!date) {
        return res.status(400).json({ error: "Date is required." });
      }
    
      // Parse the date string to a JavaScript Date object to ensure proper querying
      const queryDate = new Date(date);
      // Set time to 00:00:00 to match only the date part
      queryDate.setUTCHours(0, 0, 0, 0);
  
      // Create the end date for the range query (the next day at 00:00:00)
      const nextDay = new Date(queryDate);
      nextDay.setDate(queryDate.getDate() + 1);
  
      // Find bookings for the specified date
      const bookings = await Booking.find({
        owner_id,
        date: {
          $gte: queryDate,
          $lt: nextDay
        }
      });
  
      return res.status(200).json(bookings);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  
  updateBookingStatus: async (req, res) => {
    try {
      const { id, status } = req.body;
      if (!id || !status) {
        return res.status(400).json({ error: "Booking ID and status are required." });
      }
  
      const booking = await Booking.findById(id);
      if (!booking) {
        return res.status(404).json({ error: "Booking does not exist." });
      }
  
      booking.status = status;
      await booking.save();
  
  
      return res.status(200).json({ message: "Booking status updated successfully!" });
    } catch (err) {
      console.error(err); // Add this line
      return res.status(500).json({ msg: err.message });
    }
  },

  saveSettings: async (req, res) => {
    try {
      const owner_id = req.user.id;
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
  
      const { openTime, closeTime, rate } = req.body;
  
      if (!openTime || !closeTime || !rate) {
        return res.status(400).json({ error: "Open time, close time, and rate are required." });
      }
      // Convert openTime and closeTime from strings to objects with hour and minute properties
      const [openHour, openMinute] = openTime.split(":").map(Number);
      const [closeHour, closeMinute] = closeTime.split(":").map(Number);
  
      const Venue = await venue.findOne({ owner_id });

      if (!Venue) {
        return res.status(400).json({ error: "Venue does not exist." });
      }
  
      Venue.openat = { hour: openHour, minute: openMinute };
      Venue.closeat = { hour: closeHour, minute: closeMinute };
      Venue.rate = rate;
  
      await Venue.save();
  
      return res.status(200).json({ message: "Settings saved successfully!" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  venuesettings: async (req, res) => {
    try {
      const owner_id = req.user.id; // Assuming you have some middleware to set req.user
      console.log(owner_id);
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
      const Venue = await venue.findOne({ owner_id });
      console.log(Venue);
      if (!Venue) {
        return res.status(400).json({ error: "Venue does not exist." });
      }
      res.status(200).json({
        openTime: Venue.openat,
        closeTime: Venue.closeat,
        rate: Venue.rate
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  bookinghistory: async (req, res) => {
    try {
      const owner_id = req.user.id;
      if (!owner_id) {
        return res.status(400).json({ error: "Owner ID is required." });
      }
  
      const bookings = await Booking.find({ owner_id });
      console.log(bookings);
  
      return res.status(200).json({ bookings });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
}

module.exports = ownerCtrl;




