const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fiterValueSchema = new Schema({
    filtervalue:{
        type:String,
        required:true,
        
    },
    filter_id:{
        type:Schema.Types.ObjectId,
        ref:'filters',
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
});


module.exports = mongoose.model('filtervalues',fiterValueSchema)