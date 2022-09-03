const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DealsofthedaySchema = new Schema({
    categoryid:{
        type:Schema.Types.ObjectId,
       
        ref: 'categories',
        required:false
    },
    categoryicon:{
        type: String,
        require:false
    },
    description:{ 
        type: String,
        require: true
    },
    offerdescription:{
        type: String,
        require: true
    },
    offercode:{
        type: String,
        require: true
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

module.exports = mongoose.model('dealsofthedays',DealsofthedaySchema);
