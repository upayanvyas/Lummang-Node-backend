const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const hotdealsController = require('../controllers/HotdealsController');




router.get('/createhotdeals',hotdealsController.gethotdeal);
router.post('/createhotdeals',hotdealsController.posthotdeal);
router.get('/api/getcreatehotdeals',hotdealsController.gethotdeals)
router.get('/gethotdealsview',hotdealsController.getViewhotdeals)
router.get('/gethotdealsedit/:_id',hotdealsController.getEdithotdeals)
router.get('/deletehotdeals/:_id',hotdealsController.getDeletehotdeals)
router.post('/postupdatehotdeals',hotdealsController.postUpdatehotdeals);
router.get('/getallhotdeals',hotdealsController.apiGetallhotdeals)
module.exports = router;

