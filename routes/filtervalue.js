const express= require('express');
const router = express.Router();
const filtervalueController = require('../controllers/FiltervalueController');
//const filterController = require('../controllers/FilterController');



router.get('/editfiltervalue/:FilterValueId',filtervalueController.getEditFilterValue);
 
router.get('/filtervalueview',filtervalueController.getFilterValuesView);
router.get('/createfiltervalue',filtervalueController.getCreateFilterValue);
router.post('/createfiltervalue',filtervalueController.postFilterValueCreate);
router.get('/deletefiltervalue/:FilterValueId',filtervalueController.getDeleteFilterValues);
router.post('/updatefiltervalue/:FilterValueId',filtervalueController.postUpdateFilterValue);
router.get('/api/Filter/getFilterValueByFilterId/:FilterId',filtervalueController.apigetFilterValueByFiterId);
router.get('/api/Filtervalues/getFiltervaluesByfilterId/:FilterId',filtervalueController.apiGetFilterValuesByCategoryId)
module.exports= router