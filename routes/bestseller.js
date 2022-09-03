const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const bestsellerController = require('../controllers/BestsellerController');

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


router.get('/createbestseller',bestsellerController.getCreatebestselleritem);
router.post('/createbestseller',bestsellerController.postCreatebestseller);
router.get('/getbestseller',bestsellerController.getApibestseller)
router.get('/bestsellerview',bestsellerController.getViewbestseller )
router.get('/bestselleredit/:_id',bestsellerController.geteditbestseller)
router.get('/deletebesteller/:_id',bestsellerController.getDeletebestseller)
router.post('/updatebestseller',bestsellerController.postUpdatebestseller)

module.exports = router;

 