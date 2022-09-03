const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const feauredController = require('../controllers/FeauredController');




router.get('/createfeatureditem',feauredController.getCreatefeatureditem);
router.get('/getfeatureditem',feauredController.getfeatureditem);
router.post('/createfeatureditem',feauredController.postCreatefeatureditem);
router.get('/api/getfeatureditem',feauredController.getmostfeaured)
router.get('/geteditfeatureditem/:_id',feauredController.getEditFeatureditem)
router.post('/postupdatefeaturedproduct',feauredController.postUpdatefeaturedproduct);
router.get('/deletefeatureditem/:_id',feauredController.getDeletefeatureditem)
router.get('/allfeatured',feauredController.apiGetallfeatureditem)


module.exports = router;

