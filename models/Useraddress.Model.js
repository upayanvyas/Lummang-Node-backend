const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UseraddressSchema = new Schema({
    
  
    customerid : {
        required :false,
        type :String
    },

    email: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    
   
    pincode:{
        type:String,
        require:false
    },
    locality:{
        type:String,
        require:false
    },
    address:{
        type:String,
        required:false 
    },
    
    phoneno:{
        type:String,
        required:false
    },
    country:{
        type:String,
        required:false
    },
    alternativeno:{
        type:String,
        required:false
    },
    addresstype:{
        type:String,
        required:true
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
    }
})


module.exports = mongoose.model('useraddress',UseraddressSchema)