const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl.js');
const verifyToken = require('../middleware/verifyToken');


router.post('/bookvenue', verifyToken, userCtrl.bookvenue);
router.get('/userprofile', verifyToken, userCtrl.userprofile);
router.get('/getBooking', verifyToken, userCtrl.getBooking);
router.get('/getUserName', verifyToken, userCtrl.getUserName);
router.get('/isUserLoggedIn', verifyToken, userCtrl.isUserLoggedIn);
router.post('/reviews', verifyToken, userCtrl.addreview);
router.get('/getReviews/:id', userCtrl.getReviews);


module.exports = router;
 