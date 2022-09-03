const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NewarrivalsitemSchema = new Schema({
    itemid:{
        type:Schema.Types.ObjectId,
       
        ref: 'items',
        required:false
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

module.exports = mongoose.model('newarrivalsitem',NewarrivalsitemSchema);
