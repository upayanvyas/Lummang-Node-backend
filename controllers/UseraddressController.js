
const UseraddressModel = require('../models/Useraddress.Model');


//for order place
     module.exports.useraddressregister=(req,res) =>{
        const customerid = req.body.customerid;
   
        const fullname=req.body.lastname; 
        const phoneno = req.body.phoneno;
        const pincode = req.body.pincode;
        
        const address = req.body.address;
        const country = req.body.country; 
        const email = req.body.email; 
       const useraddressmodel = new UseraddressModel()
           
        useraddressmodel.customerid = req.body.customerid;
   
        useraddressmodel.fullname=req.body.fullname;
        useraddressmodel. phoneno = req.body.phoneno;
        useraddressmodel.pincode = req.body.pincode;
        
        useraddressmodel.address = req.body.address;
        useraddressmodel.country = req.body.country;
        useraddressmodel.email = req.body.email; 
        useraddressmodel.city = req.body.city; 
        useraddressmodel.state = req.body.state; 
         useraddressmodel.addresstype=req.body.addresstype;   
       
        useraddressmodel.save()
        .then(result=>{ 
             return  res.send(result)
        })
        
    }
//get item by id  
module.exports.getViewuseraddress =(req,res,next) =>{
       const useraddressid = req.params._id;
       UseraddressModel.findById(useraddressid).exec(function(err,user){
           res.status(200).json({
               status: "success",
               statuscode : "200", 
              
                   user:user,
                   status : "success",
                   message : "views sucessfully", 
             
           }) 
       })
        
   }

   module.exports.postUpdateuseraddress = (req,res,next)=>{
      
       const customerid = req.body.customerid; 
       const _id=req.body._id
      const fullname = req.body.fullname;
     
      const phoneno = req.body.phoneno;
     
      const address = req.body.address;
      const pincode = req.body.pincode;
     
     
      const email  = req.body.email;
      
      
      UseraddressModel.findOne({customerid:customerid,_id:_id}).then(user=>{
         
          user.fullname = fullname;
          user.phoneno = phoneno;
         user.email =email;
        
          user.pincode=pincode;
          user.address=address;
         
          return user.save()
      })
  }
 
  module.exports.getcountaddress =(req,res,next) =>{
    const customerid = req.params.customerid;
    UseraddressModel.find({isDeleted:false,customerid:customerid}).count(function(err,address){
        res.status(200).json({
            status: "success",
            statuscode : "200",
           
            address:address,
                status : "success",
                message : "views sucessfully",
          
        }) 
    })
     
}
    

module.exports.getapiDeleteuseraddress = (req,res,next)=>{
    
    const customerid = req.params.customerid;
    const deletedBy = req.params.deletedBy
    UseraddressModel.findOne({isDeleted:false,customerid:customerid}).then(useraddress=>{
        useraddress.isDeleted = true;
        useraddress.deletedBy =deletedBy; 
        useraddress.deletedOn = new Date()
        useraddress.save()
    })

        return res.status(200).json({
            status: "success",
            statuscode : "200",
           
               
                status : "success",
                message : "delete sucessfully",
                
          
        }) 
    
       
     
 
}
module.exports.getuseraddressbycustomerid =(req,res,next) =>{
    const customerid = req.params.customerid;
    UseraddressModel.find({isDeleted:false,customerid:customerid}).exec(function(err,user){
        res.status(200).json({
            status: "success",
            statuscode : "200", 
           
                user:user,
                status : "success",
                message : "views sucessfully", 
          
        }) 
    })
     
}