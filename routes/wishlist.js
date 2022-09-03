const express = require('express');
const router = express.Router();

const WishList = require('../controllers/WishlistController');

router.get('/wishlist/addwishlist/:customerid/:itemid', WishList.getWishlist);
router.get('/api/wishlist/:customerid',WishList.getViewWishlist);
router.get('/api/deletewishlist/:WishlistId/:deletedBy',WishList.getapiDeletewishlist);
router.get('/api/wishlist/viewwishlist/:customerid/:itemid', WishList.getwishlistbyitemidandcustomerid);
router.get('/api/wishlist/:customerid/:itemid/:deletedBy',WishList.apideletewishlistbyitemidandcustomerid);
module.exports = router; 
  