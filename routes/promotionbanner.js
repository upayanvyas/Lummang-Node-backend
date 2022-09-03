const express = require('express');
const router = express.Router();

const multer = require('multer');
const { v4: uuidv4 } = require('uuid');

var cors = require('cors');
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


const promotionbannerController =  require('../controllers/PromotionbannerController');

router.get('/createpromotionbanner',promotionbannerController.getpromotionbannerCreate);

router.post('/createpromotionbanner',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),promotionbannerController.postpromotionbannerCreate);
router.post('/updatepromotionbanner',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),promotionbannerController.postUpdatepromotionbanner);

router.get('/getpromotionbanner',promotionbannerController.getpromotionbanner);
router.get('/getpromotionbannerview',promotionbannerController.getpromotionbannerview);
router.get('/getpromotionbanneredit/:_id',promotionbannerController.getEditpromotionbanner);

router.get('/deletepromotionbanner/:_id',promotionbannerController.getDeleteImageSlider);



module.exports = router; 
