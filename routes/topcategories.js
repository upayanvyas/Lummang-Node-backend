const express= require('express');
const router = express.Router();
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const TopcategoriesController = require('../controllers/TopcategoriesController');

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
router.get('/createtopcategories',TopcategoriesController.getCreateTopcategories);
router.post('/createtopcategories',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),TopcategoriesController.postCreateTopcategories);

router.get('/getViewTopcategories',TopcategoriesController.getViewTopcategories)
router.get('/getEditTopcategories/:_id',TopcategoriesController.getEditTopcategories)
router.post('/postupdate/:_id',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),TopcategoriesController.postUpdatetopcategories)

router.get('/topcategoriesview',TopcategoriesController.gettopcategories)
router.get('/deletetopcategories/:topcategoriesid',TopcategoriesController.getDeleteTopcategories)

module.exports = router;

