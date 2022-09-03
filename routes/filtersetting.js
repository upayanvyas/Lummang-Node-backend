const express= require('express');
const router = express.Router();
const filtersettingController = require('../controllers/FiltersettingController');



router.get('/createfiltersetting',filtersettingController.getFilterforfiltersetting);
router.post('/createfiltersetting',filtersettingController.postFiltersettingCreate);
router.get('/FiltersettingView',filtersettingController.GetFilterAndFilterValuesView)
router.get('/deletefiltersetting/:_id',filtersettingController.getDeleteFilterSettings);
router.get('/getfiltersettingid/:_id',filtersettingController.getEditFilterAndFilterValueSetting)

router.post('/editfiltersetting/:_id',filtersettingController.postUpdateFilterAndFilterValueSetting)
router.get('/api/Filter/getFilterByCategoryId/:Categoryid',filtersettingController.apiGetFilterAndFilterValuesByCategoryId);
router.get('/api/getFilterByCategoryId/:Categoryid/:Filterid',filtersettingController.getfiltervaluebyctegoryidandfilter);
router.get('/api/getFiltersByCategoryId/:category_id',filtersettingController.apiGetfilterByCategory);
router.get('/api/getFilterdetailsByCategoryId/:category_id',filtersettingController.getfilterdetailsbycategoryid);
router.get('/api/getFiltervaluesByCategoryId/:category_id',filtersettingController.apiGetfiltervalueByCategory);

//router.get('/api/Filtervalues/getFiltervaluesByfilterId/:filterid',filtersettingController.apiGetFilterValuesByCategoryId)
module.exports= router     