const express = require("express");

const router = express.Router();
const deliveryPartyContoller = require("../controllers/DeliveryPartyController");

router.get(
  "/createdeliveryparty",
  deliveryPartyContoller.getCreateDeliveryParty
);
router.get(
  "/deliverypartyview",
  deliveryPartyContoller.getDeliveryPartyView
);
router.get(
  "/deliverypartyedit/:dpId",
  deliveryPartyContoller.getEditDeliveryParty
);

router.get(
  "/deletedeliveryparty/:dpId",
  deliveryPartyContoller.getDeleteDeliveryParty
);

router.post(
  "/postcreatedeliveryparty",
  deliveryPartyContoller.postCreateDeliveryParty
);
router.post(
  "/postdeliverypartyview",
  deliveryPartyContoller.postUpdateDeliveryParty
);
router.post(
  "/api/deliveryparty/postdeliverypartylogin",
  deliveryPartyContoller.postApiDeliveryPartyLogin
);
module.exports = router;