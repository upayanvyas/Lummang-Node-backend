const express = require('express');


const router = express.Router();
const cors = require('cors');
const GoogleMapController = require('../controllers/GoogleMapController');

router.post('/api/map/getpincode',cors(),GoogleMapController.postGetPincode);
module.exports = router;