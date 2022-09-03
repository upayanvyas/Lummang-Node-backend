const mongoose = require('mongoose')
const validator = require("validator");
const newSchema = new mongoose.Schema({
    categoryname:{
        type:String,
        require:true
    },
    alias:{
        type:String,
        require:true,
    },
    link:{
        type:String,
        require:true
    },
    primary:{
        type: String,
        require:true
    },
    icon:{
        type:String,
        require:false,
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
});

module.exports=mongoose.model('categories',newSchema)