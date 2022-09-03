const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const wishlistSchema = new Schema({
    customerid:{
        type:String,
        require:true
    },
    itemid:{
        type:Schema.Types.ObjectId,
        ref:'items', 
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
    price:{
        type:String,
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

module.exports =  mongoose.model('wishlists',wishlistSchema);