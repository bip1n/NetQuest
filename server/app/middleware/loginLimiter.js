// Importing the 'express-rate-limit' library for implementing rate limiting in an Express.js application
const rateLimit = require('express-rate-limit');

// Importing the 'logEvents' function from the custom 'logger' module
const { logEvents } = require('./logger');

// Creating a rate limiter middleware for limiting login requests from the same IP
const loginLimiter = rateLimit({
    // Setting the time window for rate limiting (1 minute in this case)
    windowMs: 30 * 1000,

    // Defining the maximum number of login requests allowed per IP within the specified window
    max: 5,

    // Message to be sent when the maximum limit is exceeded
    message: { message: 'Too many login attempts from this IP, please try again after a 60-second pause' },

    // Custom handler function to log rate limit exceeded events and send appropriate response
    handler: (req, res, next, options) => {
        // Logging rate limit exceeded events using the 'logEvents' function
        logEvents(`Too Many Requests: ${options.message.message}\t${req.method}\t${req.url}\t${req.headers.origin}`, 'errLog.log');

        // Sending an HTTP response with the specified status code and message
        res.status(options.statusCode).send(options.message);
    }, 

    // Setting to include standard headers in the rate limit response
    standardHeaders: true,

    // Disabling legacy headers in the rate limit response
    legacyHeaders: false,
});

// Exporting the login rate limiter middleware for use in other parts of the application
module.exports = loginLimiter;
