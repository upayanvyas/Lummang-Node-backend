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


const ImageSliderController =  require('../controllers/ImageSliderCmsController');

router.get('/cms/imageslidercreate',ImageSliderController.getImageSliderCreate);
router.get('/imagesliderview',ImageSliderController.getImageSliderView);

router.post('/cms/postImageSliderCreate',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ImageSliderController.postImageSliderCreate);

router.get('/api/cms/getimagesliders',cors(), ImageSliderController.getApiImageSlides);

router.get('/deleteimageslider/:imagesliderid',ImageSliderController.getDeleteImageSlider);
router.get('/editimageslider/:imagesliderid',ImageSliderController.getEditimageslider);
router.post('/postupdateimageslider',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),ImageSliderController.postUpdateImageSlider);

module.exports = router;
