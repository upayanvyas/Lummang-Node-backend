const express= require('express');
const router = express.Router();
const multer = require('multer');
var bodyParser=require('body-parser');
const { v4: uuidv4 } = require('uuid');
router.use(express.json())
router.use('/assets',express.static('assets'))

const mostpopularitemController = require('../controllers/MostpopularitemController');




router.get('/createmostpopularitem',mostpopularitemController.getCreatemostpopularitem);
router.get('/mostpopularitemview',mostpopularitemController.getViewmostpopularitem)
router.post('/createmostpopularitem',mostpopularitemController.postCreatemostpopularitem);
router.get('/getmostpopularitem',mostpopularitemController.getmostpopularitem)
router.get('/getmostpopularitem/:mostpopularitemid',mostpopularitemController.getEditmostpopularitem)
router.get('/deletemostpopularitem/:mostpopularitemid',mostpopularitemController.getdeletemostpopularitem)
router.post('/updatemostpopularitem',mostpopularitemController.postUpdatemostpopularitem )

module.exports = router;

