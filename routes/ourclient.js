const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const ourclientController = require('../controllers/OurclientController');

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


router.get('/createourclient',ourclientController.getCreateourclient);
router.post('/createourclient',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ourclientController.postCreateDealsoftheday);
router.get('/api/getclint',ourclientController.getApiclint);
router.get('/ourclientsview',ourclientController.getViewourclients);
router.get('/editourclients/:_id',ourclientController.getEditourclients);
router.post('/postUpdateourclient',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ourclientController.postUpdateourclient);
router.get('/deleteourclients/:_id',ourclientController.getDeleteourclient);
module.exports = router;

