const express = require('express');
const multer = require('multer');
//const uuidv4 = require('uuid/v4');

const router = express.Router();

 const ItemImageController = require('../controllers/ImageController');

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
 
 
//router.get('/item/imageupload',ItemImageController.getImageUpload);
router.post('/image/imageupload',multer({storage:fileStorage,fileFilter:fileFilter}).fields([{name:'udyamregistrationcertificate',maxCount:1},{name:'frontsidephoto',maxCount:1}
,{name:'backsidephoto',maxCount:1},{name:'leftsidephoto',maxCount:1},{name:'rightsidephoto',maxCount:1}]),ItemImageController.postImageUpload);

module.exports = router;