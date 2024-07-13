const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');
const loginLimiter = require('../middleware/loginLimiter');


router.post('/viewData', authCtrl.viewData);
router.post('/statusVenue', authCtrl.statusVenue);

module.exports = router;