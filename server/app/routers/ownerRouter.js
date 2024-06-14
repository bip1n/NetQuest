// Import required modules
const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');
const upload = require("../middleware/multer");


// Define route for user registration
// router.post('/viewabout', ownerCtrl.viewabout);  
router.get('/viewprofile',verifyToken, ownerCtrl.viewprofile);
router.get('/venuedetails',ownerCtrl.VenueDetails);
router.get('/viewphotos', ownerCtrl.viewphotos);
router.post('/updateProfile', verifyToken, ownerCtrl.updateProfile);
router.post('/savemedia', verifyToken, upload.fields([
    { name: 'media', maxCount: 6 },
]),  ownerCtrl.savemedia);

// router.post('/saveimages', verifyToken, ownerCtrl.saveimages);



// Export the router to be used in other parts of the application
module.exports = router;
 