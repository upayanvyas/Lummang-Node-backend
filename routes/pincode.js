const express= require('express');
const router = express.Router();
const pincodeController = require('../controllers/PincodeController');
const timeSlotController = require('../controllers/TimeSlotController');
router.get('/pincode/pincodecreate',pincodeController.getCreatePincode);
router.get('/pincode/pincodeview',pincodeController.getViewPincode);
router.post('/pincode/pincodecreate',pincodeController.postCreatePincode);
router.get('/pincode/editpincode/:PincodeId',pincodeController.getEditPincode);
router.post('/pincode/updatepincode', pincodeController.postUpdatePincode);
router.get('/pincode/deletepincode/:PincodeId',pincodeController.getDeletePincode);

router.get('/pincode/createtimeslot',timeSlotController.getCreateTimeSlot);
router.post('/pincode/timeslotcreate', timeSlotController.postCreateTimeSlot);

//api
router.get('/api/pincode/getdeliverytime/:Pincode', pincodeController.getApiDeliveryTime);
router.get('/api/pincode/getpincodes/:pincode', pincodeController.getPincodes);

module.exports = router;