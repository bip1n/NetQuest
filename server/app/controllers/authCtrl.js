const Users = require("../models/userModel");
const Admin = require("../models/ownerModel");
const VenueStatus = require("../models/venueStatus");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    login: async (req, res) => {
        try {
            const {email, password} = req.body;
            const user = await Users.findOne({email});
            if (!user){ 
                return res.status(400).json({msg: "User does not exist."})
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch){
                return res.status(400).json({msg: "Incorrect password."})
            }
            // If login success, create access token and refresh token
            const access_token = createAccessToken({id: user._id, email: user.email});
            const refresh_token = createRefreshToken({id: user._id, email: user.email});

            // send the access token and refresh token to the client with status code
            return res.status(200).json({msg: "Login Success!", access_token, refresh_token});
            
          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    register_user: async (req, res) => {
        try {
            const {username, phone, email, password, } = req.body;
            if (!username) {return res.status(400).json({ error: 'username is required' });}
            if (!email) {return res.status(400).json({ error: 'email is required' });}
            if (!phone) {return res.status(400).json({ error: 'Phone number is required' });}
            if (!password) {return res.status(400).json({ error: 'password is required' });}

            const user = await Users.findOne({email});
            if (user) return res.status(400).json({msg: "The email already exists."});

            if (password.length < 6) return res.status(400).json({msg: "Password must be at least 6 characters long."});
            const passwordHash = await bcrypt.hash(password, 10);

            const newUser = new Users({
                username, email, phone, password: passwordHash
            });
            await newUser.save();
          
            // sucess msg to react client for register sucess with status code
            return res.status(200).json({msg: "Register Success!"});

        } catch (err) {
          return res.status(500).json({ msg: err.message });
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
                admin_id: newAdmin._id, status: "Not Verified", admin_comment: "", images: imageUrls, videos: [videoUrl]
            });

            await newVenueStatus.save();

            // Success message to react client for register success with status code
            return res.status(200).json({ msg: "Register Success!" });

        } catch (err) {
            console.log("error:", err);
            return res.status(500).json({ error: err.message });
        }
    }
}

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

