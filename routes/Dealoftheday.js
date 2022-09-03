const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const DealsofthedayController = require('../controllers/DealsofthedayController');

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


router.get('/createdealsoftheday',DealsofthedayController.getCreateDealsoftheday);
router.get('/viewdealsoftheday',DealsofthedayController.getViewDealsoftheday);
router.post('/createdealsoftheday',multer({storage:fileStorage,fileFilter:fileFilter}).single('categoryicon'),DealsofthedayController.postCreateDealsoftheday);
router.get('/deletedealsoftheday/:dealsofthedayid',DealsofthedayController.getDeleteDealsoftheday);
router.get('/editdealsoftheday/:dealsofthedayid',DealsofthedayController.getEditDealsoftheday);
router.post('/updatedealsoftheday',multer({storage:fileStorage,fileFilter:fileFilter}).single('categoryicon'),DealsofthedayController.postUpdateDealsoftheday);
router.get('/api/dealsoftheday/getdealsoftheday',DealsofthedayController.getApiDealsOftheday);

module.exports = router;

