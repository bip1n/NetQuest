const Users = require("../models/userModel");
const Admin = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const Venue = require("../models/venueModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            console.log("req.body:", req.body);

            if (!email) {return res.status(400).json({ error: 'email is required' });}
            if (!password) {return res.status(400).json({ error: 'password is required' });}
            console.log("email:", email);
            const user = await Users.findOne({email});
            console.log("user:", user);
            if (!user){ 
                return res.status(400).json({error: "User does not exist."})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({error: "Incorrect password."})
            }
            // If login success, create access token and refresh token
            const access_token = createAccessToken({id: user._id, email: user.email});
            const refresh_token = createRefreshToken({id: user._id, email: user.email});

            // send the access token and refresh token to the client with status code
            return res.status(200).json({error: "Login Success!", access_token, refresh_token});
            
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    login_admin: async (req, res) => {
        try {
            const {email, password, venueID} = req.body;


            if (!email) {return res.status(400).json({ error: 'email is required' });}
            if (!password) {return res.status(400).json({ error: 'password is required' });}
            if (!venueID) {return res.status(400).json({ error: 'venueID is required' });}

            const admin = await Admin.findOne({email});
            if (!admin) return res.status(400).json({error: "Admin does not exist."});

            const venue = await Venue.findOne({owner_id: admin._id});
            if (!venue) return res.status(400).json({error: "Venue does not exist."});

            if (venue.venueID !== venueID) return res.status(400).json({error: "Venue ID does not match."});

            const isMatch = await bcrypt.compare(password, admin.password);
            if (!isMatch) return res.status(400).json({error: "Incorrect password."});

            // If login success, create access token and refresh token
            const access_token = createAccessToken({id: admin._id, email: admin.email});
            const refresh_token = createRefreshToken({id: admin._id, email: admin.email});

            // send the access token and refresh token to the client with status code
            return res.status(200).json({error: "Login Success!", access_token, refresh_token});
            
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    register_user: async (req, res) => {
        try {

            const {username, phone, email, password} = req.body;

            if (!username) {return res.status(400).json({ error: 'username is required' });}
            if (!email) {return res.status(400).json({ error: 'email is required' });}
            if (!phone) {return res.status(400).json({ error: 'Phone number is required' });}
            if (!password) {return res.status(400).json({ error: 'password is required' });}

            const user = await Users.findOne({email});
            if (user) return res.status(400).json({error: "The email already exists."});

            if (password.length < 6) return res.status(400).json({error: "Password must be at least 6 characters long."});
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new Users({
                username, email, phone, password: passwordHash
            });
            await newUser.save();
          
            // sucess msg to react client for register sucess with status code
            return res.status(200).json({error: "Register Success!"});

        } catch (err) {
          return res.status(500).json({ error: err.message });
        }
    },
    
    
    register_admin: async (req, res) => {
        try {
            const { fullname, phone, venueName, panNumber, mapCoord, email, password } = req.body;
    
            if (!phone) return res.status(400).json({ error: 'Phone number is required' });
            if (!fullname) return res.status(400).json({ error: 'fullname is required' });
            if (!venueName) return res.status(400).json({ error: 'venue name is required' });
            if (!panNumber) return res.status(400).json({ error: 'pan number is required' });
            if (!mapCoord) return res.status(400).json({ error: 'mapCoord is required' });
            if (!email) return res.status(400).json({ error: 'email is required' });
            if (!password) return res.status(400).json({ error: 'password is required' });
    
            const reg_email = await Admin.findOne({ email });
            if (reg_email) return res.status(400).json({ error: "The email already exists." });
    
            const reg_phone = await Admin.findOne({ phone });
            if (reg_phone) return res.status(400).json({ error: "The phone number already exists." });
    
            if (password.length < 6) return res.status(400).json({ error: "Password must be at least 6 characters long." });
            const passwordHash = await bcrypt.hash(password, 10);
    
            const newAdmin = new Admin({
                fullname, phone, venueName, panNumber, mapCoord, email, password: passwordHash
            });
    
            await newAdmin.save();
    
            const images = req.files['images'];
            const video = req.files['video'] ? req.files['video'][0] : null;
    
            if (!images || images.length === 0) {
                return res.status(400).json({ error: 'At least one image is required.' });
            }
    
            if (!video) {
                return res.status(400).json({ error: 'A video is required.' });
            }
    
            const imageUrls = await Promise.all(images.map(async (file) => {
                const result = await cloudinary.uploader.upload(file.path, { folder: 'venue_images' });
                return result.secure_url;
            }));
    
            const videoResult = await cloudinary.uploader.upload(video.path, { folder: 'venue_videos', resource_type: 'video' });
            const videoUrl = videoResult.secure_url;
    
            const newVenueStatus = new VenueStatus({
                owner_id: newAdmin._id, status: "pending", admin_comment: "", images: imageUrls, videos: [videoUrl]
            });
    
            // Generate a unique alphanumeric venueID
            const venueID = await generateUniqueVenueID();
    
            const newVenue = new Venue({
                owner_id: newAdmin._id, venueID, images: [], videos: [], amenities: [], reviews: []
            });
    
            await newVenue.save(); // Save the venue details
    
            await newVenueStatus.save();
    
            // Success message to react client for register success with status code
            return res.status(200).json({ msg: "Register Success!" });
    
        } catch (err) {
            console.log("error:", err);
            return res.status(500).json({ error: err.message });
        }
    },    
}

function generateAlphanumericID() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';
    for (let i = 0; i < 6; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}


const generateUniqueVenueID = async () => {
    let isUnique = false;
    let venueID;
    
    while (!isUnique) {
        venueID = generateAlphanumericID();
        const existingVenue = await Venue.findOne({ venueID });
        if (!existingVenue) {
            isUnique = true;
        }
    }

    return venueID;
};


const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1h",
    });
};

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "7d",
    });
}

module.exports = authCtrl;

