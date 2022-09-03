var express=require('express')
const router = express.Router()
const useraddresscontroller = require('../controllers/UseraddressController')
var bodyParser=require('body-parser');
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

 



module.exports= router.post('/useraddress',useraddresscontroller.useraddressregister);
module.exports= router.get('/api/useraddress/:_id',useraddresscontroller.getViewuseraddress);
module.exports=router.post('/updateuseraddress',useraddresscontroller.postUpdateuseraddress);
module.exports=router.get('/countaddress/:customerid',useraddresscontroller.getcountaddress);
module.exports=router.get('/api/delete/useraddress/:customerid',useraddresscontroller.getapiDeleteuseraddress);
module.exports=router.get('/api/useraddressbyuserid/:customerid',useraddresscontroller.getuseraddressbycustomerid);
