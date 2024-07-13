const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');

router.post('/viewData', adminCtrl.viewData);
router.post('/getPendingVenue', adminCtrl.getPendingVenue);
router.post('/verifyVenue', adminCtrl.verifyVenue);
router.post('/rejectVenue', adminCtrl.rejectVenue);
router.post('/changeStatus', adminCtrl.changeStatus);

module.exports = router;