const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const pincodeSchema = new Schema({
    pincode:{
        type:String,
        require:true
    },
    areaname:{
        type:String,
        require:true,
    },
    isCodAvailable:{
        type : Boolean,
        required :  true,
        default : true        
    },
    timeSlot:[

    ],
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
});

module.exports =  mongoose.model('pincode',pincodeSchema);