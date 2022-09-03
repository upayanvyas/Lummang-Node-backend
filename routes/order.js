const express= require('express');
const router = express.Router();


const OrderController = require('../controllers/OrderController');

router.post('/api/order/verifyOrderPayment', OrderController.verifyOrderPayment);

router.post('/api/order/placeorder',OrderController.postPlaceOrder);
router.get('/api/order/user/getmyorders/:sellerid', OrderController.getUserMyOrdersbusellerid);
router.get('/api/order/user/getmyorder/:buyerid', OrderController.getOrdersbybuyerid);
router.get('/order/manageorder',OrderController.getManageOrder);
router.get('/api/order/getordersby_id/:orderid', OrderController.getOrderDetailsBy_Id);
router.post('/api/order/user/cancel', OrderController.postUserCancelOrder);
router.get('/api/order/user/trackorder/:orderno', OrderController.getTrackOrder); 
router.post('/order/postschedulepickup', OrderController.postSchedulePickup);
router.get('/order/schedulepickup/:orderno', OrderController.schedulePickup);
router.post('/api/order/userside/cancel', OrderController.ApiPostCancelUserSide);
router.get('/api/order/sendemail', OrderController.getEmial);
router.post('/order/admin/cancelorder', OrderController.PostCancelAdminSide);
router.get('/order/cancelorder/:orderno', OrderController.getCancelOrderAdminSide);
router.get('/api/order/gettodeliverorderlistbydeliverypartyid/:deliveryparty', OrderController.ApitoGetDeliverList);
router.get('/api/order/pickup/:orderid/:deliveryparty', OrderController.postPickup);
router.get('/api/order/gettopickuporderlistbydeliverypartyid/:deliveryparty', OrderController.ApitoGetPickupList);
router.get('/order/printpackingslipandinvoice/:orderno', OrderController.printPackingslipAndInvoice);
router.get('/cartdetail/:customerid', OrderController.getcartbyuserid);

router.get('/getallorder', OrderController.getalloredr);



module.exports= router;
