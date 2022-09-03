const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const inventorySchema = new Schema({
    vendor:{
        type:String,
        required:false
    },
    itemid:{
        type:Schema.Types.ObjectId,
       
        ref: 'items',
        required:false
    },
    mrp:{
        type:Number,
        required:true
    },
    sellingprice:{
        type:Number,
        required:false
    },
    currentstock:{
        type:Number,
        required:false
    },
    activeStatus:{
        type:Boolean,
        require:false,
        default: true
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

module.exports = mongoose.model('inventories',inventorySchema);