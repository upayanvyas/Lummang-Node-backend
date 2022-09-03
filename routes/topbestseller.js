const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))
 
const topbestsellercontroller = require('../controllers/TopbestsellerController');




router.get('/createtopbestseller',topbestsellercontroller.gettopbestseller);
router.post('/createtopbestseller',topbestsellercontroller.posttopbestseller);
router.post('/updatetopbestseller',topbestsellercontroller.postUpdatetopbestseller);

router.get('/gettopbestseller',topbestsellercontroller.getapibestseller);
router.get('/topbestsellerview',topbestsellercontroller.getViewtopbestseller);
router.get('/topbestselleredit/:_id',topbestsellercontroller.getedittopbestseller)
router.get('/topbestsellerdelete/:_id',topbestsellercontroller.getDeletetopbestseller)

module.exports = router;

