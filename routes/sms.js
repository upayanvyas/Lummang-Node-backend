const express = require('express');
const router = express.Router();

const SMS = require('../controllers/SmsController');

router.get('/api/sms/sendsignupotp/:mobileno', SMS.sendSignUpOTP);
router.post('/api/otp/:gstinno', SMS.otp);
router.post('/api/phoneno/:ifsc/:account_number/:name/:mobile', SMS.phoneno);
router.post('/api/pincode', SMS.validatepincode);
module.exports = router;    