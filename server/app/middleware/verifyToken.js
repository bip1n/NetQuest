// Importing the 'jsonwebtoken' library for working with JSON Web Tokens (JWT)
const jwt = require("jsonwebtoken");

// Importing 'dotenv' to load environment variables from a .env file
require('dotenv').config();

// Middleware function to verify the authenticity of a JWT token
async function verifyToken(req, res, next) {
    // Extracting the Bearer token from the 'Authorization' header
    const { authorization: BearerToken } = req.headers;

    // Splitting the Bearer token to extract the actual token value
    const tokenSpace = BearerToken ? BearerToken.split(' ') : [];
    const token = tokenSpace[1];

    // Checking if the token is missing or set to 'null' or 'undefined'
    if (!token || token === 'null' || token === 'undefined') {
        return res.status(401).json({ message: "Please Login" });
    }

    try {
        // Extracting the secret key for JWT verification from environment variables
        const { ACCESS_TOKEN_SECRET } = process.env;

        // Verifying the token using the 'jsonwebtoken' library
        jwt.verify(token, ACCESS_TOKEN_SECRET, (err, decoded) => {
            // Handling JWT verification errors
            if (err) {
                return res.status(403).json({ message: 'Failed to authenticate token', error: err.message });
            }

            // Storing the decoded user information in the request object
            req.user = decoded;
            // Proceeding to the next middleware or route handler
            next();
        });
    } catch (error) {
        // Handling unexpected errors during JWT verification
        res.status(500).json({ msg: "Internal Server Error" });
    }
}

// Exporting the middleware function for use in other parts of the application
module.exports = verifyToken;