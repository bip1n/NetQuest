// Import required modules
const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl.js');

// Define route for user registration
router.post('/viewpost', userCtrl.viewpost);  


// Export the router to be used in other parts of the application
module.exports = router;
