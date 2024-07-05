// Import required modules
const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl.js');
const verifyToken = require('../middleware/verifyToken');


// Define route for user registration
router.post('/bookvenue', userCtrl.bookvenue);
router.get('/userprofile', verifyToken, userCtrl.userprofile);
router.get('/getBooking', verifyToken, userCtrl.getBooking);
router.get('/getUserName', verifyToken, userCtrl.getUserName);
router.get('/isUserLoggedIn', verifyToken, userCtrl.isUserLoggedIn);


// Export the router to be used in other parts of the application
module.exports = router;
 