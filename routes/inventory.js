const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/InventoryController');

router.get('/inventory/additemtomyinventory',inventoryController.getAddNewItemToMyInventory);
router.get('/inventory/myinventory',inventoryController.getMyInventory);
router.post('/inventory/additemtomyinventory',inventoryController.postAddNewItemToMyInventory);
router.get('/inventory/deleteitemfrommyinventory/:inventory_id',inventoryController.getDeleteItemFromInventory);
module.exports= router