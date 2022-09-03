const express= require('express');
const router = express.Router();


const razorpay = require('../controllers/razorpayContrller');

router.post('/api/razorpay', razorpay.createorderid);
module.exports = router;     