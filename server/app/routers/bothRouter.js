const router = require('express').Router();
const bothCtrl = require('../controllers/bothCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');

router.get('/NavDetails',verifyToken, bothCtrl.NavDetails);
router.get('/getVenue', bothCtrl.getVenue);
router.get('/venues/:id', bothCtrl.getVenueById);
router.get('/venue/:id/slots', bothCtrl.getVenueSlots);
router.get('/khalti/response', bothCtrl.khaltiResponse);
router.post('/verifypayment', bothCtrl.verifyPayment);
router.post('/khalti/payment', bothCtrl.khaltiPayment);





module.exports = router;
 