const DeliveryPartyModel = require("../models/DeliveryParty.Model");
var successmessage = null;
var errormessage = null;

module.exports.getCreateDeliveryParty = (req, res, next) => {
  res.render("./deliveryparty/deliverypartycreate", {
    successmessage: successmessage,
    errormessage: errormessage
  });
};

module.exports.postCreateDeliveryParty = (req, res, next) => {
  const name = req.body.name;
  const phoneno = req.body.phoneno;
  const userid = req.body.userid;
  const password = req.body.password;

  const deliveryparty = new DeliveryPartyModel({
    name: name,
    phoneno: phoneno,
    userid: userid,
    password: password
  });

  deliveryparty.save().then(result => {
    console.log("DeliveryParty Created");
    successmessage = "Success";
    res.render("./deliveryparty/deliverypartycreate");
  });
};

module.exports.getDeliveryPartyView = (req, res, next) => {
  DeliveryPartyModel.find({ isDeleted: false }, function(err, deliveryparty) {
    res.render("./deliveryparty/deliverypartyview", {
      deliveryparty: deliveryparty,
      successmessage: successmessage,
      errormessage: errormessage
    });

    successmessage = null;
    errormessage = null;
  });
};

module.exports.getEditDeliveryParty = (req, res, next) => {
  const userid = req.params.dpId;
  DeliveryPartyModel.findById(userid).then(deliveryparty => {
    res.render("./deliveryparty/deliverypartyedit", {
      deliveryparty: deliveryparty,
      successmessage: successmessage,
      errormessage: errormessage
    });
    successmessage = null;
    errormessage = null;
  });
};

module.exports.postUpdateDeliveryParty = (req, res, next) => {
  const name = req.body.name;
  const phoneno = req.body.phoneno;
  const dpid = req.body.dpId;

  DeliveryPartyModel.findById(dpid)
    .then(deliveryparty => {
      deliveryparty.name = name;
      deliveryparty.phoneno = phoneno;
      //deliveryparty.userid = userid;

      return deliveryparty.save();
    })
    .then(result => {
      successmessage = "DeliveryParty Updated Successfully";
      res.redirect("/deliverypartyview");
    });
};

module.exports.getDeleteDeliveryParty = (req, res, next) => {
  const dpId = req.params.dpId;

  DeliveryPartyModel.findById(dpId)
    .then(deliveryparty => {
      deliveryparty.isDeleted = true;
      return deliveryparty.save();
    })
    .then(result => {
      successmessage = "DeliveryParty Deleted Successfully";
      res.redirect("/deliverypartyview");
    })
    .catch(err => {
      errormessage = err;
      res.redirect("/deliverypartyview");
    });
};

module.exports.postApiDeliveryPartyLogin=(req,res,next)=>{
    const userid = req.body.userid;
    const password = req.body.password;
    DeliveryPartyModel.find({userid:userid, password:password},function(err,deliveryparty){
        if(err==null){
            if (deliveryparty.length>0){
                res.status(200).json({
                    StatusCode:200,
                    Status :'success',
                    data:{
                        status:'success',
                        message:'login successfull',
                        userid : deliveryparty[0]._id,
                        name: deliveryparty[0].name,
                        mobileno: deliveryparty[0].phoneno
                    }
                })
            }
            else{
                res.status(200).json({
                    StatusCode:200,
                    Status :'failed',
                    data:{
                        status:'failed',
                        message: 'login failed'

                    }
                })
            }
        }
        else{
            res.status(200).json({
                StatusCode:200,
                Status :'failed',
                data:{
                    status:'failed',
                    message: err
                }
            })
        }
        })

}