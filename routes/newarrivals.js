const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const newarrivalsController = require('../controllers/NewarrivalsController');

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


router.get('/createnewarrivals',newarrivalsController.getCreateNewarrivals);
router.post('/createnewarrivals',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),newarrivalsController.postCreateNewarrivals);
router.get('/getnewarrivals',newarrivalsController.getApinewarrivals)
router.get('/getviewnewarrivals',newarrivalsController.getViewnewarrivals)
router.get('/deleteviewnewarrivals/:newarrivalid',newarrivalsController.getDeletenewarrival)
router.get('/editviewnewarrivals/:newarrivalid',newarrivalsController.getEditnewarrivals)
router.post('/updatenewarrival/:newarrivalid',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),newarrivalsController.postUpdatenewarrivals)
 
module.exports = router;
 
 