const Users = require("../models/userModel");
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

            res.cookie("__AcessToken", refresh_token, {
                httpOnly: true,
                // path: "/api/refresh_token",  // this is the path for refresh token
                maxAge: 2 * 24 * 60 * 60 * 1000, //validity of 2 days
            });

            // storing acess token on client is not recommended, but doing this for simplicity

            res.json({access_token, user: {email: user.email}});

          
        } catch (err) {
          return res.status(500).json({ msg: err.message });
        }
    },

    register_user: async (req, res) => {
        try {
            const {username, phone, email, password, } = req.body;

            if (!phone) {return res.status(400).json({ error: 'Phone number is required' });}
            if (!username) {return res.status(400).json({ error: 'username is required' });}
            if (!email) {return res.status(400).json({ error: 'email is required' });}
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
            const {username, phone, email, password, } = req.body;

            if (!phone) {return res.status(400).json({ error: 'Phone number is required' });}
            if (!username) {return res.status(400).json({ error: 'username is required' });}
            if (!email) {return res.status(400).json({ error: 'email is required' });}
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

  // Then create jsonwebtoken to authentication
            // const access_token = createAccessToken({id: newUser._id, email: newUser.email});
            // const refresh_token = createRefreshToken({id: newUser._id, email: newUser.email});

            // res.cookie("__AcessToken", access_token, {
            //     httpOnly: true,
            // });

            // res.cookie("__RefreshToken", refresh_token, {
            //     httpOnly: true,
            //     // path: "/api/refresh_token",  // this is the path for refresh token
            //     maxAge: 7 * 24 * 60 * 60 * 1000, //validity of 7 days
            // });


