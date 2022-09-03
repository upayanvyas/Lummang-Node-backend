var express=require('express')

const router = express.Router()
var bodyParser=require('body-parser');

router.use(express.json())
router.use('/assets',express.static('assets'))
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());

const inventorycontroller= require('../controllers/InventoryController')
const ItemController = require('../controllers/ItemController');
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


router.get('/category',ItemController.getAllCategory);
//router.post('/api/createitem',multer({storage:fileStorage,fileFilter:fileFilter}).array('itemImages'),ItemController.postItemCreate);

router.get('/api/item/itemsearchfrontend/:itemname',ItemController.apiGetitemSearchFrontEnd);
router.get('/api/item/itemsearch/:itemname',ItemController.apiGetitemSearch);
router.get('/api/:_id',ItemController.apiitem);

router.get('/api/item/itemdetailsbyitemid/:_id',ItemController.apiGetItemByItemId);
router.get('/item/itemview',ItemController.getItemView); 
router.get('/item/deleteitem/:ItemId',ItemController.getDeleteItem);
router.get('/item/edititem/:ItemId',ItemController.getEditItem);

router.get('/api/item/getitemsbycategoryid/:categoryId',ItemController.apiGetItemByCategoryId);
router.get('/item/bulkupload',ItemController.getItemBulkUpload);
router.get('/api/item/getitembyuserid/:createdBy',ItemController.apiGetitemByuseid);
router.post('/item/postbulkupload',multer({storage:fileStorage}).single('items'),ItemController.PostItemBulkUpload);
router.get('/api/item/deleteitem/:ItemId/:deletedBy',ItemController.getapiDeleteItem);
router.get('/api/:itemId',ItemController.apiitem);
router.post('/api/item/edititem/:ItemId',ItemController.edititem);
router.post('/api/item/editinventory',ItemController.geteditinventory);
router.get('/api/item/itemsearchbyitemdetailsfrontend/:longdescription',ItemController.apiGetitemSearchbyitemdetailsFrontEnd);
router.get('/api/item/:categoryid',ItemController.apiGetitemBycategory);
router.post('/item/productlisting/',multer({storage:fileStorage,fileFilter:fileFilter}).fields([{name:'coverphoto',maxCount:1},{name:'brandphoto',maxCount:1},{name:'productimage1',maxCount:1}
,{name:'productimage2',maxCount:1},{name:'productimage3',maxCount:1},{name:'productimage4',maxCount:1},{name:'productimage5',maxCount:1}]),ItemController.createproductlisting);

module.exports= router     