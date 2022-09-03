
const PincodeModel = require('../models/Pincode.Model');
var successmessage = null;
var errormessage = null;
module.exports.getCreateTimeSlot=(req,res,next)=>{
    PincodeModel.find({isDeleted:false},function(err,pincode){
        res.render('pincode/createtimeslot',{
            pincode : pincode,
            successmessage : successmessage,
            errormessage : errormessage
        })
    })
}
function isArrayMdnOfficial(objToCheck) {
    return Object.prototype.toString.call(objToCheck) === '[object Array]';
}

module.exports.postCreateTimeSlot = (req,res,netx)=>{
    const fromtime = req.body.fromtime;
    const totime = req.body.totime;
    const deliverywithin = req.body.deliverywithin;
    if(isArrayMdnOfficial(req.body.pincode) )
    {
        for(var j=0;j<req.body.pincode.length;j++){
            const pincode = req.body.pincode[j]; 
            PincodeModel.find({pincode:pincode},function(err,pin){
                for(var i=0;i<pin.length;i++){
                    PincodeModel.findById(pin[i]._id).then(pinc=>{
                        const timeslot = pinc.timeSlot;
                        timeslot.push({
                            fromtime : fromtime,
                            totime : totime,
                            deliverywithin : deliverywithin
                        })
                        pinc.timeSlot = timeslot
                        return pinc.save()
                    }).then(result=>{
                       
                    })
                    .catch(err=>
                        { console.log(err)
                        });    
                }
                
            })      
        }
        return res.send('success')
    }
    else{
        console.log('fff')
        const pincode = req.body.pincode;
      
        PincodeModel.find({pincode:pincode},function(err,pin){
            for(var i=0;i<pin.length;i++){
                PincodeModel.findById(pin[i]._id).then(pinc=>{
                    const timeslot = pinc.timeSlot;
                    timeslot.push({
                        fromtime : fromtime,
                        totime :  totime,
                        deliverywithin : deliverywithin
                    })
                    pinc.timeSlot = timeslot
                    return pinc.save()
                }).then(result=>{
                   
                })
                .catch(err=>
                    { console.log(err)
                    });    
            }
           return res.send(result)
        })
    }
}