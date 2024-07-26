const router = require('express').Router();
const adminCtrl = require('../controllers/adminCtrl');

router.post('/viewData', adminCtrl.viewData);
router.post('/getPendingVenue', adminCtrl.getPendingVenue);
router.post('/getverifiedVenue', adminCtrl.getverifiedVenue);
router.post('/getrejectVenue', adminCtrl.getrejectVenue);
router.post('/changeStatus', adminCtrl.changeStatus);
router.get('/admin_details', adminCtrl.admin_details);
router.post('/logsheet', adminCtrl.logsheet);


module.exports = router;