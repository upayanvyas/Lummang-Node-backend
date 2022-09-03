const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))
 
const trendingproductController = require('../controllers/TrendingproductController');




router.get('/createtrendingproduct',trendingproductController.gettrendingproduct);
router.post('/createtrendingproduct',trendingproductController.postCreatetrendingproduct);
router.get('/gettrendingproduct',trendingproductController.getapitrendingproduct );
router.get('/gettrendingproduct',trendingproductController.getviewtrendingproduct)
router.get('/deletegettrendingproduct/:_id',trendingproductController.getDeletetrendingproduct)
router.get('/gettrendingproductedit/:_id',trendingproductController.getEditTrendingproduct )
router.post('/updatetrendingproduct',trendingproductController.postUpdatetrendingproduct)


module.exports = router;

