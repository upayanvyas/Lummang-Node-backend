var express=require('express')
const router = express.Router()
const customercontroller = require('../controllers/CustomersController')
var bodyParser=require('body-parser');
router.use('/assets',express.static('assets'))
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const multer=require('multer')
const { v4: uuidv4 } = require('uuid');




const fileStorage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'assets/images');
    }, 
    filename:(req,file,cb)=>{
        cb(null, uuidv4()+ '_'+file.originalname);
    }
});
const fileFilter =(req,file,cb)=>{
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype ==='image/jpeg')
    {
        cb(null,true);
    }
    else{
        cb(null,false);
    }
}





router.post('/api/createotp',customercontroller.getotp); 
router.post('/api/verifyotp/:Phoneno',customercontroller.verifyotp);
//router .get('/api/getuser/:UserId',usercontroller.getuser);
//router .get('/api/getalluser',usercontroller.getViewuser);

router.post('/api/sellerregister/',multer({storage:fileStorage,fileFilter:fileFilter}).fields([{name:'passbookicon',maxCount:1},{name:'udyamregistrationcertificate',maxCount:1}])
,customercontroller.sellerregister)
router.post('/api/updatecustomer/',multer({storage:fileStorage,fileFilter:fileFilter}).single('passbookicon'),customercontroller.postUpdatecustomer)
router.post('/api/buyerregister/',multer({storage:fileStorage,fileFilter:fileFilter}).fields([{name:'udyamregistrationcertificate',maxCount:1},{name:'frontsidephoto',maxCount:1}
,{name:'backsidephoto',maxCount:1},{name:'leftsidephoto',maxCount:1},{name:'rightsidephoto',maxCount:1}]),customercontroller.buyerregister)
router.get('/api/customerdetails/:_id',customercontroller.apiGetcustomerBycustomerid);
module.exports= router     
 