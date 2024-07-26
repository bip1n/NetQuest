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


module.exports = router;
 