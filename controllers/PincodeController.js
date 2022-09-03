const PincodeModel = require('../models/Pincode.Model');
var successmessage = null;
var errormessage = null;

// entry pincode
module.exports.getCreatePincode=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){
            res.render('pincode/pincodecreate',{
                successmessage:successmessage,
                errormessage:errormessage
            });
            successmessage = null;
                errormessage = null;
        }
        else{
            res.redirect('/admin/login');
         }
    }
    else{
        res.redirect('/admin/login');
    }
}
//pincode View Page
module.exports.getViewPincode = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            PincodeModel.find({isDeleted:false},function(err,pincode){   
                res.render('pincode/pincodeview',{
                    pincode : pincode,
                    successmessage : successmessage,
                    errormessage:errormessage
                });
                successmessage = null;
                errormessage = null;
            }); 
        }
        else{
           res.redirect('/admin/login');
        }
   }
   else{
       res.redirect('/admin/login');
   }
}
//pincode Edit Page
module.exports.getEditPincode = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const PincodeId = req.params.PincodeId;
            PincodeModel.findById(PincodeId).then(pincode=>{
            
                    res.render('pincode/editpincode',{
                        pincode: pincode
                    });

               
            }); 
            
        }
        else{
           res.redirect('/admin/login');
        }
   }
   else{
       res.redirect('/admin/login');
   }
}
//pincode Insert Operation
module.exports.postCreatePincode = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            
                const pincode = req.body.pincode;
              
                let isCodAvailable 
                if(req.body.isCodAvailable=== 'on'){
                    isCodAvailable =  true;
                }
                else{
                    isCodAvailable =false;
                }
               
                console.log(isCodAvailable)
                const areaname = req.body.areaname;
                const Mpincode = new PincodeModel(
                    {
                    pincode:pincode,
                    isCodAvailable:isCodAvailable,
                    areaname:areaname,
                    createdBy:req.session.userdetails.userid,
                    createdon: new Date()
                }
                );
                Mpincode
                    .save().then(result=>{
                        successmessage = 'Success';
                        console.log('pincode Created');
                        res.redirect('/pincode/pincodecreate');
                    })
                    .catch(err=>{
                        errormessage = err;
                        console.log(err);
                        res.redirect('/pincode/pincodecreate');
                    })
                  
            }
            else{
               res.redirect('/admin/login');
            }
       }
       else{
           res.redirect('/admin/login');
       }
}
// pincode Update Operation
module.exports.postUpdatePincode = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const PincodeId= req.body._id;
            const mpincode = req.body.pincode;
           
            const isCodAvailable = req.body.isCodAvailable;
            const areaname = req.body.areaname;
            const updatedBy =  req.session.userdetails.userid;
            const updatedOn = new Date();
            PincodeModel.findById(PincodeId).then(pincode=>{
                pincode.pincode = mpincode;
                pincode.isCodAvailable = isCodAvailable;
                pincode.areaname = areaname;
                pincode.updatedBy = updatedBy;
                pincode.updatedOn = updatedOn;
                return pincode.save()
            }).then(result=>{
                successmessage= "pincode Updated Successfully";
                res.redirect('/pincode/pincodeview');
            })
            .catch(err=> {
                errormessage =err;
                res.redirect('/pincode/pincodeview');
            });
        }
        else{
            res.redirect('/admin/login');
        }
   }
   else{
       res.redirect('/admin/login');
   }
}
//delete pincode
module.exports.getDeletePincode =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const PincodeId = req.params.PincodeId;
            PincodeModel.findById(PincodeId).then(pincode=>{
                pincode.isDeleted = true;
                pincode.deletedBy = req.session.userdetails.userid;;
                pincode.updatedOn = new Date();
                return pincode.save()
            }).then(result=>{
                successmessage= "pincode Deleted Successfully";
                res.redirect('/pincode/pincodeview');
            })
            .catch(err=> {
                errormessage=err;
                res.redirect('/pincode/pincodeview');
            });
        }
        else{
            res.redirect('/admin/login');
        }
   }
   else{
       res.redirect('/admin/login');
   }        
}

//api api api api api api api api api api api api api api api api api api api

//get Delivery Time Api
module.exports.getApiDeliveryTime = (req,res,netx)=>{
    
    const pincode = req.params.Pincode;
    const datetime =new Date() 
    const time = datetime.toLocaleTimeString('en-US', {  hour12: false,  hour: "numeric", 
    minute: "numeric"})
    var agg =[
            {'$unwind':'$timeSlot'},
           
              {'$match':
                {
                    
                    "timeSlot.fromtime":{"$lte": time},
                    "timeSlot.totime":{"$gte":time},
                }
            },
            ]
  
      PincodeModel.aggregate(agg   , function(err, timeSlot){
        res.status(200).json({
            StatusCode : "200",
            Status : "success",
            data:{
                Status : "success",
                "timeslots" :  timeSlot
            }
            
        })
      });
    
   
}

module.exports.getPincodes = (req,res,next)=>
{
    const pincode = req.params.pincode;
    PincodeModel.find({isDeleted:false, pincode:pincode},function(err,pin){
        res.status(200).json({
            status : "success",
            StatusCode : "200",
            data :{
                status : 'success',
                message : 'success',
                pincode : pin
            }
        })
    })
}
