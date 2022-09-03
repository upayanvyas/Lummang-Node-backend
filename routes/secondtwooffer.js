const express= require('express');
const router = express.Router();
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const { v4: uuidv4 } = require('uuid');
const secondtwoofferController = require('../controllers/SecondtwoofferController');

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
router.get('/createsecondtwooffer',secondtwoofferController.getCreatesecondtwooffer);
router.post('/createsecondtwooffer',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),secondtwoofferController.postsecondToptwooffer);
router.post('/postupdatesecondtwooffer',multer({storage:fileStorage,fileFilter:fileFilter}).single('image'),secondtwoofferController.postUpdatesecondtwooffer);
router.get('/deletesecondtwooffer/:_id',secondtwoofferController.getDeletesecondtwooffer);

router.get('/api/gettwooffer',secondtwoofferController.getsecondtoptwooffer)
router.get('/secondtwoofferview',secondtwoofferController.getViewsecondToptwooffer)
router.get('/secondtwoofferedit/:_id',secondtwoofferController.getEditsecondToptwooffer)

module.exports = router;
