const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const newarrivalsitemController = require('../controllers/NewarrivalsitemController');




router.get('/createnewarrivalsitem',newarrivalsitemController.getCreateNewarrivalsitem);
router.post('/createnewarrivalsitem',newarrivalsitemController.postCreateNewarrivalsitem);
router.get('/getnewarrivalsitem',newarrivalsitemController.getnewarrivalsitem)
router.get('/newarrivalsitemview',newarrivalsitemController.newarrivalsitemview);
router.get('/newarrivalsitemedit/:_id',newarrivalsitemController.getEditnewarrivalsitem);
router.get('/deletenewarrival/:_id',newarrivalsitemController.getdeletenewarrivalsitem);
router.post('/postupdatenewarrivalitem',newarrivalsitemController.postUpdatenewarrivalitem);

module.exports = router;

  