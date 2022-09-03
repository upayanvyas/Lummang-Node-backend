const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SecondtwoofferSchema = new Schema({
    categoryid:{
       
            type:Schema.Types.ObjectId,
            ref:'categories',
            required:true
      
       
    },
    image:{
        type:String,
        require:true,
    },
   title: {
    type:String,
    require:false,
    },
    description:{
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

module.exports =  mongoose.model('secondtwooffers',SecondtwoofferSchema);