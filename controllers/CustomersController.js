const userModel = require('../models/Customers.Model');
const user = require('../models/Customers.Model');
const otpGenerator= require('otp-generator');
const express = require('express');
const router = express.Router();

const SMS = require('../controllers/SmsController');

var assert=require('assert');
 
 

 
//create otp
   module.exports.getotp = async(req,res) =>{
{ 
        const Phoneno =req.body.Phoneno ;
        
        const usertype=req.body.usertype;
      userModel.findOne({Phoneno:Phoneno}).then(data=>{
        if(!data){
            const Phoneno =req.body.Phoneno ;
            
            const usertype=req.body.usertype;
           
                const User=new user({Phoneno:Phoneno,usertype:usertype});
                console.log(User)
                 User.save();
                  return res.send(User)
            }
            
          
        else{
           
           
            data.usertype=usertype;
           
            data.save()
            //return res.status(200).send("otpsend")
              return res.send(data);
        }
        
        
        }
       
      )}
           
             
 
}

       
 //verify otp and save

module.exports.verifyotp= async(req,res) =>{
    {
          const Phoneno =req.params.Phoneno ;
        const Otp = req.body.Otp;
       {    
         userModel.findOne({Phoneno:Phoneno}).then(user=>{
          user.Otp=Otp;   
            user.save()
            res.send(user)
            
           })   
       }     
    }
}

//seller register
    module.exports.sellerregister=(req,res,next) =>{
        console.log(req.body); 
        
        const Phoneno =req.body.Phoneno ;
        const companyname = req.body.companyname;
        const companyownername = req.body.companyownername;
        const businesspancardno = req.body.businesspancardno;
        const Gstcertificate = req.body.Gstcertificate;
        const  udyamregistrationcertificate =req.files;
        const typeofbusiness= req.body.typeofbusiness;
        const currentaccountno=req.body.currentaccountno; 
        const IFsc=req.body.IFsc; 
        const pincode=req.body.pincode; 
        const passbookicon = req.files;
       {    
           
           userModel.findOne({Phoneno:Phoneno}).then(user=>{ 
          user.companyname=companyname;
          user.companyownername=companyownername;
          user.businesspancardno=businesspancardno;
          user.Gstcertificate=Gstcertificate;
          user.udyamregistrationcertificate=udyamregistrationcertificate;
          user.typeofbusiness=typeofbusiness;
          user.currentaccountno=currentaccountno;
          user.IFsc=IFsc;
          user.pincode=pincode; 
          user.passbookicon=passbookicon;
          user.createdOn=(req.body.createdOn=new Date()) 
        
        user.save()
             
         return  res.send(user) 

                
          
          
          
        });
    
    }
      
   
    
    
    }   
    
    //buyer register
    module.exports.buyerregister=(req,res,next) =>{
        console.log(req.body); 
        
        const Phoneno =req.body.Phoneno ;
        
        const shopownername = req.body.shopownername;
        const shopname = req.body.shopname;
        const businesspancardno = req.body.businesspancardno;
        const Gstcertificate = req.body.Gstcertificate;
        const  udyamregistrationcertificate =req.files;
        const frontsidephoto=req.files;
        const backsidephoto=req.files;
        const leftsidephoto=req.files;
        const rightsidephoto=req.files;
        const typeofbusiness= req.body.typeofbusiness;
        const pincode=req.body.pincode;
      
       {    
           
           userModel.findOne({Phoneno:Phoneno}).then(user=>{
          
          user.shopownername=shopownername;
          user.shopname=shopname;
          user.businesspancardno=businesspancardno;
          user.Gstcertificate=Gstcertificate;
          user.udyamregistrationcertificate=udyamregistrationcertificate;
          user.frontsidephoto=frontsidephoto;
          user.backsidephoto=backsidephoto; 
          user.leftsidephoto=leftsidephoto;
          user.rightsidephoto=rightsidephoto;
          user.typeofbusiness=typeofbusiness;
          user.pincode=pincode;
          user.createdOn=(req.body.createdOn=new Date())
          
        user.save()
            
         return  res.send(user)

                
          
          
          
        });
    
    }
      
   
    
    
    }   
                       
 

    module.exports.apiGetcustomerBycustomerid= (req,res,next)=>{
        const customerid = req.params._id;
        userModel.findById(customerid).then(users =>{
            const response = {
                StatusCode : 200,
                Status : 'success',
                data:{ 
                    users: users
                } 
            }  
            res.send(response);
        })
    }  



    module.exports.postUpdatecustomer = (req,res,next)=>{
      
                 const customerid = req.body._id;
                const companyname = req.body.companyname;
               
                const companyownername = req.body.companyownername;
               
                const businesspancardno = req.body.businesspancardno;
                const currentaccountno = req.body.currentaccountno;
                const IFsc = req.body.IFsc;
                const pincode=req.body.pincode;
                const typeofbusiness = req.body.typeofbusiness;
                const Phoneno = req.body.Phoneno;
                const Image = req.file; 
                var passbookicon ;
                const updatedBy =  req.body.updatedBy; 
                const updatedOn = new Date();
                userModel.findByIdAndUpdate(customerid ).then(user=>{
                    if(Image==null){
                        passbookicon = user.passbookicon
                    }  
                    else{
                        passbookicon =  Image.filename 
                    } 
                    user.companyname = companyname; 
                    user.companyownername = companyownername;
                   user.businesspancardno =businesspancardno;
                   user.companyownername = companyownername; 
                    user.IFsc = IFsc;
                    user.currentaccountno = currentaccountno;
                    user.typeofbusiness = typeofbusiness;
                    user.Phoneno = Phoneno;
                    user.pincode=pincode;
                   user.passbookicon= passbookicon;
                   user.updatedBy = updatedBy;
                    user.updatedOn = updatedOn;
                    return user.save()
                })
            }
           