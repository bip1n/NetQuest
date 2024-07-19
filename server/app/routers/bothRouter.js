// Import required modules
const router = require('express').Router();
const bothCtrl = require('../controllers/bothCtrl.js');
const verifyToken = require('../middleware/verifyToken.js');
const axios = require('axios');
var request = require('request');



router.get('/NavDetails',verifyToken, bothCtrl.NavDetails);
router.get('/getVenue', bothCtrl.getVenue);
router.get('/venues/:id', bothCtrl.getVenueById);
router.get('/venue/:id/slots', bothCtrl.getVenueSlots);


router.post("/khalti/payment", async (req, res) => {
    const payload = req.body;
    var options = {
    'method': 'POST',
    'url': 'https://a.khalti.com/api/v2/epayment/initiate/',
    'headers': {
    'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
            return res.status(200).json(JSON.parse(response.body));
        }else{
            return res.status(400).json(JSON.parse(response.body));
        }
    })
});


router.post("/khalti/response", async (req, res) => {
    const payload = req.body;
    var options = {
    'method': 'POST',
    'url': 'https://a.khalti.com/api/v2/epayment/lookup/',
    'headers': {
    'Authorization': 'key live_secret_key_68791341fdd94846a146f0457ff7b455',
    'Content-Type': 'application/json',
    }, 
    body: JSON.stringify(payload)
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        if (response.statusCode == 200) {
            return res.status(200).json(JSON.parse(response.body));
        }else{
            return res.status(400).json(JSON.parse(response.body));
        }
    })
});



module.exports = router;
 