const orderModel = require("../models/Order.Model");
const DeliveryPartyModal = require("../models/DeliveryParty.Model");
const cartModel = require("../models/Cart.Model");
var crypto = require("crypto");

// verify order payment if successfull
module.exports.verifyOrderPayment = (req, res) => {
  // Receive Payment Data
  const { razorpay_order_id, razorpay_payment_id } = req.body;
  const razorpay_signature = req.headers["x-razorpay-signature"];
  // Pass yours key_secret here
  const key_secret = "dOAqRVD82luVx1ZZu5TErmm2";
  // Verification & Send Response to User
  // Creating hmac object
  let hmac = crypto.createHmac("sha256", key_secret);
  // Passing the data to be hashed
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  // Creating the hmac in the required format
  const generated_signature = hmac.digest("hex");
  if (razorpay_signature === generated_signature) {
    res.json({ success: true, message: "Payment has been verified" });
  } else {
    res.json({ success: false, message: "Payment verification failed" });
  }
};

module.exports.getBuyerOrders = (req, res) => {
  let id = req.params.id;
  let status = req.params.status;
  console.log('id-status: ',id,status)

  let query = {customerid: id}

  if (status != 'all'){
    query['orderstatus'] = status
  }
  console.log(query)

  orderModel
    .find(query)
    .then((response) => {
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};


module.exports.getSellerOrders = (req, res) => {
  let id = req.params.id;
  let status = req.params.status;
  console.log('id-status: ',id,status)

  let query = {sellerid: id}

  if (status != 'all'){
    query['orderstatus'] = status
  }
  console.log(query)

  orderModel
    .find(query)
    .then((response) => {
      res.status(200).json({
        status: "SUCCESS",
        data: response,
      });
    })
    .catch((err) => {
      console.log("err: ", err);
    });
};

//for order place
module.exports.postPlaceOrder = (req, res, next) => {
  const orderDatetime = new Date();
  const customerid = req.body.customerid;

  const fullname = req.body.fullname;
  const phoneno = req.body.phoneno;
  const pincode = req.body.pincode;

  const address = req.body.address;
  const country = req.body.country;
  const email = req.body.email;
  const addresstype = req.body.addresstype;

  cartModel.find({ customerid: customerid, isDeleted: false }).then((item) => {
    const paymentmode = req.body.paymentmode;
    const transactionrefno = req.body.transactionrefno;
    const itemdetails = [];
    var customer_message = "Dear Customer, Thank You for ordering  (";
    var saller_message = "order received ";
    var neworderno = pincode;
    const rendom = Math.floor(Math.random() * 89999 + 1000);
    if (paymentmode == "cod")
      neworderno = neworderno + "-" + 2 + "-247-" + rendom;
    else neworderno = neworderno + "-" + 4 + "-247-" + rendom;

    for (var i = 0; i < item.length; i++) {
      customer_message =
        customer_message +
        " " +
        item[i].itemname +
        " of qty-" +
        item[i].quantity +
        " for Rs. " +
        item[i].ourprice;
      saller_message =
        saller_message +
        " " +
        item[i].itemname +
        " qty " +
        item[i].quantity +
        " of Rs. " +
        item[i].ourprice;

      itemdetails.push({
        itemid: item[i].itemid,
        itemname: item[i].itemname,
        image: item[i].itemimage,
        ourprice: item[i].ourprice,
        mrp: item[i].mrp,
        gst: 12,
        sellerid: item[i].sellerid,

        quantity: item[i].quantity,
        currentstatus: "orderplaced",
        status: [
          {
            orderStatus: "orderplaced",
            orderplacedDatetime: new Date(),
          },
        ],
      });
    }
    customer_message =
      customer_message +
      ") has been placed successfully. The product will be delivered shortly.";
    orderModel.find(function (err, nnorder) {
      neworderno = neworderno + (nnorder.length + 1);
      const order = new orderModel({
        orderDatetime: orderDatetime,
        orderNo: neworderno,
        customerid: customerid,
        fullname: fullname,
        pincode: pincode,
        phoneno: phoneno,
        address: address,
        email: email,
        country: country,
        addresstype: addresstype,
        itemdetails: itemdetails,
        status: [
          {
            orderStatus: "orderplaced",
            orderplacedDatetime: new Date(),
          },
        ],
        orderstatus: "orderplaced",
        currentorderstatusdatetime: new Date(),
        paymentmode: paymentmode,
        transactionrefno: transactionrefno,
      });
      order
        .save()
        .then((result) => {
          res.send(result);
        })
        .catch((err) => {
          res.status(200).json({
            status: "success",
            statuscode: "200",
            data: {
              status: "failed",
              message: err,
            },
          });
        });
    });
  });
};

//get user order by sellerid
module.exports.getUserMyOrdersbusellerid = (req, res, next) => {
  const sellerid = req.params.sellerid;
  orderModel.find(
    { sellerId: sellerid, isDeleted: false },
    function (err, orders) {
      res.status(200).json({
        status: "success",
        statuscode: "200",
        data: {
          message: "success",
          orders: orders,
        },
      });
    }
  );
};

//get user order by buyerid
module.exports.getOrdersbybuyerid = (req, res, next) => {
  const customerid = req.params.customerid;
  orderModel.find(
    { customerId: customerid, isDeleted: false },
    function (err, orders) {
      res.status(200).json({
        status: "success",
        statuscode: "200",
        data: {
          message: "success",
          orders: orders,
        },
      });
    }
  );
};

//track order
module.exports.getTrackOrder = (req, res, next) => {
  const orderno = req.params.orderno;
  orderModel.find({ orderNo: orderno }, function (err, orderdetails) {
    res.status(200).json({
      status: "success",
      statuscode: "200",
      data: {
        message: "success",
        orderdetails: orderdetails,
      },
    });
  });
};

//get order details by id
module.exports.getOrderDetailsBy_Id = (req, res, next) => {
  const order_id = req.params.orderid;
  orderModel.findById(order_id).then((orderdetails) => {
    res.status(200).json({
      status: "success",
      statusCode: "200",
      data: {
        orderdetails: orderdetails,
      },
    });
  });
};

//api cancel order
module.exports.postUserCancelOrder = (req, res, next) => {
  const itemid = req.body.itemid;
  const orderno = req.body.orderno;
  const cancelReason = req.body.cancelReason;
  const cancelComment = req.body.cancelComment;

  orderModel.find({ orderNo: orderno }, async function (err, orders) {
    let itemdetails = [];
    itemdetails = orders[0].itemdetails;
    for (var i = 0; i < itemdetails.length; i++) {
      if (itemdetails[i].itemid == itemid) {
        itemdetails[i].currentstatus = "canceled";
        const istatus = itemdetails[i].status;
        istatus.push({
          orderStatus: "canceled",
          orderplacedDatetime: new Date(),
        });
        itemdetails[i].status = istatus;
        itemdetails[i].cancelReason = cancelReason;
        itemdetails[i].cancelComment = cancelComment;
        itemdetails[i].canceledBy = "customer";
      }
    }

    orders[0].itemdetails = itemdetails;
    orders[0].markModified("itemdetails");
    orders[0].save();
    res.status(200).json({
      statusCode: "200",
      status: "success",
      data: {
        status: "success",
        message: "item canceled successfully",
      },
    });
  });
};

//api cancel order from userside

module.exports.ApiPostCancelUserSide = (req, res, next) => {
  const canceledReason = req.body.canceledReason;
  const orderid = req.body.orderid;
  orderModel
    .findById(orderid)
    .then((orders) => {
      var status = orders.status;
      status.push({
        orderStatus: "canceled",
        orderplacedDatetime: new Date(),
        canceledReason: canceledReason,
        canceledby: "user",
      });
      orders.canceledReason = canceledReason;
      orders.status = status;
      orders.orderstatus = "cenceled";
      orders.currentorderstatusdatetime = new Date();
      orders.canceledby = "customer";
      return orders.save();
    })
    .then((result) => {
      res.status(200).json({
        statuscode: 200,
        status: "success",
        data: {
          status: "success",
          message: "order canceled",
        },
      });
    })
    .catch((err) => {
      res.status(200).json({
        statuscode: 200,
        status: "failed",
        data: {
          status: "failed",
          message: err,
        },
      });
    });
};

module.exports.postSchedulePickup = (req, res, next) => {
  orderModel
    .findById(req.body.orderid)
    .then(async (orders) => {
      console.log(orders.itemdetails);
      let itemdetails = [];
      itemdetails = orders.itemdetails;
      for (var i = 0; i < itemdetails.length; i++) {
        if (itemdetails[i].currentstatus.toString() == "orderplaced") {
          itemdetails[i].currentstatus = "scheduled";
          const istatus = itemdetails[i].status;
          istatus.push({
            orderStatus: "scheduled",
            orderplacedDatetime: new Date(),
          });
          itemdetails[i].status = istatus;
        }
      }

      console.log(itemdetails);
      var status = orders.status;
      status.push({
        orderStatus: "scheduled",
        orderplacedDatetime: new Date(),
      });
      orders.itemdetails = itemdetails;
      orders.markModified("itemdetails");
      orders.orderstatus = "scheduled";
      orders.currentorderstatusdatetime = new Date();
      orders.height = req.body.height;
      orders.width = req.body.width;
      orders.length = req.body.length;
      orders.weight = req.body.weight;
      orders.scheduledPickupdateTime = req.body.pickuptimeslot;
      orders.deliveryparty = req.body.deliveryparty;

      return orders.save();
    })
    .then((result) => {
      successmessage = "Order Scheduled Successfully";
      return res.send(result);
    });
};

module.exports.getManageOrder = (req, res, next) => {
  var agg = [
    { $match: { "itemdetails.sellerid": "61bf4c309df5d39abf445e57" } },
  ];

  orderModel.aggregate(agg, function (err, neworders) {
    // res.status(200).json({
    //   neworders :  neworders
    //})
    res.send({
      neworders: neworders,
    });
  });
};

module.exports.getEmial = (req, res, next) => {
  /*let transporter= nodemailer.createTransport({
        host: 'smtp.zoho.com',
        port: 465,
        secure: true, //ssl
        auth: {
                user:'manish@delta24.in',
                pass:'Software@2016'
        }*

    });

    var templateDir = "/emailtemplates/orderemailtemplate";
    var sendPwdReminder = transporter.templateSender(new EmailTemplate('/emailtemplates/orderemailtemplate'), {
        from: 'manish@delta24.in',
    });
    sendPwdReminder({
        to: 'er.krushnajena@gmail.com',
        subject: 'Password reminder'
    }
    );
    res.status(200).json({
        "success" : "success"
    });
    */
};

//schedule pickup
module.exports.schedulePickup = (req, res, next) => {
  const orderno = req.params.orderno;
  var agg = [
    {
      $match: {
        orderNo: orderno,
        "itemdetails.sellerid": "61bf4c309df5d39abf445e57",
      },
    },
  ];
  DeliveryPartyModal.find({ isDeleted: false }, function (err, deliveryparty) {
    orderModel.aggregate(agg, function (err, order) {
      console.log(order);
      res.send({
        deliverypartyes: deliveryparty,
        orderdetails: order,
      });
    });
  });
};

module.exports.PostCancelAdminSide = (req, res, next) => {
  const canceledReason = req.body.canceledReason;
  const orderid = req.body.orderid;
  orderModel
    .findById(orderid)
    .then((orders) => {
      var status = orders.status;
      status.push({
        orderStatus: "canceled",
        orderplacedDatetime: new Date(),
        canceledReason: canceledReason,
        canceledby: "admin",
      });
      orders.canceledReason = canceledReason;
      orders.status = status;
      orders.orderstatus = "cenceled";
      orders.currentorderstatusdatetime = new Date();
      orders.canceledby = "admin";
      return orders.save();
    })
    .then((result) => {
      return res.send(result);
    })
    .catch((err) => {
      res.status(200).json({
        statuscode: 200,
        status: "failed",
        data: {
          status: "failed",
          message: err,
        },
      });
    });
};

module.exports.getCancelOrderAdminSide = (req, res, next) => {
  const orderno = req.params.orderno;
  var agg = [
    {
      $match: {
        orderNo: orderno,
        "itemdetails.createdBy": "61bf4c309df5d39abf445e57",
      },
    },
  ];

  orderModel.aggregate(agg, function (err, order) {
    console.log(order);
    return res.send({
      orderdetails: order,
    });
  });
};

module.exports.ApitoGetDeliverList = (req, res, next) => {
  const deliveryparty = req.params.deliveryparty;
  orderModel.find(
    { orderstatus: "pickuped", deliveryparty: deliveryparty },
    function (err, orders) {
      return res.status(200).json({
        status: "success",
        data: {
          orders: orders,
        },
      });
    }
  );
};

module.exports.postPickup = (req, res, next) => {
  orderModel
    .findById(req.params.orderid)
    .then((orders) => {
      if (orders.deliveryparty == req.params.deliveryparty) {
        var status = orders.status;
        status.push({
          orderStatus: "pickuped",
          orderplacedDatetime: new Date(),
        });

        orders.orderstatus = "pickuped";
        orders.status = status;
        orders.currentorderstatusdatetime = new Date();
        return orders.save();
      } else {
        res.status(200).json({
          statuscode: 200,
          status: "success",
          data: {
            status: "wrongpickup",
            message: "this packet is not assigned to you",
          },
        });
      }
    })
    .then((result) => {
      res.status(200).json({
        statuscode: 200,
        status: "success",
        data: {
          status: "success",
          message: "pickuped successfully",
        },
      });
    })
    .catch((err) => {
      res.status(200).json({
        statuscode: 200,
        status: "failed",
        data: {
          status: "failed",
          message: err,
        },
      });
    });
};

module.exports.ApitoGetPickupList = (req, res, next) => {
  const deliveryparty = req.params.deliveryparty;
  orderModel.find(
    { orderstatus: "scheduled", deliveryparty: deliveryparty },
    function (err, orders) {
      res.status(200).json({
        status: "success",
        data: {
          orders: orders,
        },
      });
    }
  );
};

module.exports.printPackingslipAndInvoice = (req, res, next) => {
  const orderno = req.params.orderno;
  var agg = [
    {
      $match: {
        orderNo: orderno,
        "itemdetails.sellerid": "5cf65218dd4dcc0fa8b58217",
      },
    },
  ];

  orderModel.aggregate(agg, function (err, order) {
    console.log(order);
    return res.send({
      orderdetails: order,
    });
  });
};

//get cartdetails by userid
module.exports.getcartbyuserid = (req, res, next) => {
  const customerid = req.params.customerid;
  cartModel
    .find({ customerid: customerid, isDeleted: false })
    .populate("itemid")
    .exec(function (err, carts) {
      return res.status(200).json({
        status: "success",
        statuscode: "200",
        data: {
          message: "success",
          carts: carts,
        },
      });
    });
};
