// Import required modules
const router = require('express').Router();
const bothCtrl = require('../controllers/bothCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');


router.get('/NavDetails',verifyToken, bothCtrl.NavDetails);

module.exports = router;
