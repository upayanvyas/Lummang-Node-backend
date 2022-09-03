var Request = require("request");
const Razorpay = require("razorpay");
var instance = new Razorpay({
  key_id: "rzp_test_0FDKYlrG8MBQ8Q",
  key_secret: "dOAqRVD82luVx1ZZu5TErmm2",
});

module.exports.createorderid = (req, res) => {
  console.log("createorderid : ", req.body);
  const { amount, currency, receipt, notes } = req.body;
  console.log(amount,currency,receipt,notes)

  instance.orders.create({ amount, currency, receipt, notes }, (err, order) => {
    if (!err) {
      res.json(order);
    } else {
      res.send(err);
    }
  });
};
