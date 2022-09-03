const express= require('express');
const router = express.Router();

const filterController = require('../controllers/FilterController');



router.get('/createfilter',filterController.getCreateFilter);
router.get('/deletefilter/:FilterId',filterController.getDeleteFilter);

router.get('/editfilter/:FilterId',filterController.getEditFilter);
router.post('/createfilter',filterController.postCreateFilter);
router.get('/filterview',filterController.getViewFilter);
router.post('/updatefilter/:FilterId', filterController.postUpdateFilter);


module.exports= router