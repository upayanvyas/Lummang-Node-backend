const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const catgorySchema = new Schema({
    image:{
        type:String,
        require:true
    },
    categoryid:{
        type:Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    caption:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    subtitle:{
        type:String,
        require:true  
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

module.exports =  mongoose.model('imageslidercms',catgorySchema);