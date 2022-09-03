const mongoose = require('mongoose')
const validator = require("validator");
var newSchema=new mongoose.Schema({
    usertype:{
        type:String
    },
    username:{
       type: String,
       required:false
    },
    
    Phoneno:{
         required:true,
         type:Number,
         unique:true,
    },
    
    
    password:{
        required:false,

    type:String,
    },
    confirmpassword:{

        required:false,
        type:String,
        
        },
        
            email:{
                type:String,
            require:false

            },
        
        createdBy:{
            type:String,
            require:false
        },
        createdOn:{
            type:Date,
            require:false
        },
        updatedBy:{
            type:String,
            require:false,
        },
        updatedOn:{
            type:Date,
            require:false
        },
        isDeleted:{
            type:Boolean,
            require:false,
            default: false
        },
        deletedBy:{
            type:String,
            require:false
        },
        deletedOn:{
            type:Date,
            require:false
        },
        Otp:{
         type:String,
         required:false
        },
        companyname:{
            type:String,
            required:false
     
        },
        companyownername:{
            type:String,
            required:false
     
        },
        
        businesspancardno:{
            type:String,
            required:false
        },
        Gstcertificate:{
            type:String,
            required:false
        },
        udyamregistrationcertificate:{
            type:String,
            required:false
        },
        typeofbusiness:{
            type:String,
            required:false
        },
       shopname:{
           type:String,
           required:false
       },
       shopownername:{
           type:String,
           required:false
       },
       



    
});
module.exports=mongoose.model('users',newSchema)  