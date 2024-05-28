// Import required modules
const router = require('express').Router();
const authCtrl = require('../controllers/authCtrl');
const loginLimiter = require('../middleware/loginLimiter');

// Define route for user registration
router.post('/register', authCtrl.register);  

// if you want test register using postMan use /api/register since, authRouter is mouth with /auth routes on index.js
// same goes for /login

// Define route for user login
router.post("/login", loginLimiter, authCtrl.login);


// Export the router to be used in other parts of the application
module.exports = router;
