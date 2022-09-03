const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))
 
const trendingproduct2Controller = require('../controllers/trendingproduct2Controller');




router.get('/createtrendingproduct2',trendingproduct2Controller.gettrendingproduct2);
router.post('/createtrendingproduct2',trendingproduct2Controller.postCreatetrendingproduct2);
router.get('/gettrendingproduct2',trendingproduct2Controller.getapitrendingproduct2)
router.get('/gettrendingproduct2',trendingproduct2Controller.getviewtrendingproduct2)
router.get('/deletegettrendingproduct2/:_id',trendingproduct2Controller.getDeletetrendingproduct2)
router.get('/gettrendingproduct2edit/:_id',trendingproduct2Controller.getEditTrendingproduct2)
router.post('/updatetrendingproduct2',trendingproduct2Controller.postUpdatetrendingproduct2)



module.exports = router;

