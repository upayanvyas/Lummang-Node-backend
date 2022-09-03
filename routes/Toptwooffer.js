const express= require('express');
const router = express.Router();
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const ToptwoofferController = require('../controllers/ToptwoofferController');

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
router.get('/createtoptwooffer',ToptwoofferController.getCreateToptwooffer);
router.post('/createtoptwooffer',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ToptwoofferController.postCreateToptwooffer);
router.get('/viewtoptwooffer',ToptwoofferController.getViewToptwooffer);
router.get('/edittoptwooffer/:toptwoofferid',ToptwoofferController.getEditToptwooffer);
router.post('/updatetoptwooffer',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ToptwoofferController.postUpdatetwooffer);
router.get('/deletetoptwooffer/:toptwoofferid',ToptwoofferController.getDeleteToptwooffer);
router.get('/viewtopsevenoffer',ToptwoofferController.gettoptwooffer);


module.exports = router;
