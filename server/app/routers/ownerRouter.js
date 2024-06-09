// Import required modules
const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');


// Define route for user registration
// router.post('/viewabout', ownerCtrl.viewabout);  
router.post('/viewprofile', ownerCtrl.viewprofile);
router.get('/venuedetails', ownerCtrl.VenueDetails);



// Export the router to be used in other parts of the application
module.exports = router;
 