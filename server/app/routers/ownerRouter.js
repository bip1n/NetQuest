const router = require('express').Router();
const ownerCtrl = require('../controllers/ownerCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');
const upload = require("../middleware/multer");


router.get('/viewprofile',verifyToken, ownerCtrl.viewprofile);
router.get('/venuedetails',ownerCtrl.VenueDetails);
router.get('/viewphotos', ownerCtrl.viewphotos);
router.post('/updateProfile', verifyToken, ownerCtrl.updateProfile);
router.post('/savemedia', verifyToken, upload.fields([{ name: 'media', maxCount: 6 },]),  ownerCtrl.savemedia);
router.get('/venuedata', verifyToken, ownerCtrl.venuedata);
router.get('/ongoingbooking', verifyToken, ownerCtrl.ongoingbooking);
router.get('/recentbooking', verifyToken, ownerCtrl.recentbooking);
router.get('/venues/booking-settings', verifyToken, ownerCtrl.bookingdetails);
router.post('/venues/update-booking-status', verifyToken, ownerCtrl.updateBookingStatus);
router.post('/venues/save-settings', verifyToken, ownerCtrl.saveSettings);
router.get('/venues/venue-settings', verifyToken, ownerCtrl.venuesettings);
router.get('/venues/booking-history', verifyToken, ownerCtrl.bookinghistory);



module.exports = router;
 