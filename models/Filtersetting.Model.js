const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fiterSettingSchema = new Schema({
    
    filter_id:{
        type:Schema.Types.ObjectId,
        ref:'filters',
        required:true
    },
    category_id:{
        type:Schema.Types.ObjectId,
        ref:'categories',
        required:true
    },
    FilterValues:
        {
            type:Schema.Types.ObjectId,
             ref:'filtervalues',
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


module.exports = mongoose.model('filtersettings',fiterSettingSchema)