var express=require('express')
const router = express.Router()
var bodyParser=require('body-parser');
const categoryController = require('../controllers/CategoryController');
router.use(express.json())
router.use('/assets',express.static('assets'))
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());
const multer=require('multer')
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

router.get("/createcategory",function(req,res){
   res.render('./category/createcategory')
})



router.get("/allcategory",categoryController.getAllCategory);
router.get("/getParentChildNodesWithPrimary",categoryController.getParentChildNodesWithPrimary);
router.get('/deletee/:_id',categoryController.getDeleteCategory);
router.get('/editcategory/:_id',categoryController.getEditCategory);
router.post("/updatecategory/:_id",multer({storage:fileStorage,fileFilter:fileFilter}).single('icon'),categoryController.postUpdateCategory);
router.post("/createcategory",multer({storage:fileStorage,fileFilter:fileFilter}).single('icon'),categoryController.postCreateCategory)
router.get('/get/:primary',categoryController.getCategorybyprimary);

module.exports= router
 