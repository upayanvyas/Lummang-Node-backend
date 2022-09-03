const express = require('express');
const router = express.Router();



const cart = require('../controllers/CartController');


router.get('/api/cart/addcart/:customerid/:itemid/:sellerid', cart.getCart);
router.get('/api/cart/:customerid',cart.getViewCart);
router.get('/api/deletecart/:CartId/:deletedBy',cart.getapiDeletecart);
router.get('/api/count/:customerid',cart.getcountCart);
router.get('/api/editcart/:_id/:quantity',cart.editquantity);

module.exports = router;   
         