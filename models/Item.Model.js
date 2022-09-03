const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    primary:{
        type:String,
        required : false,
        default:"0"
    },

    sku:{
        type:String,
        required : false,
    },
    itemname:{
        type:String,
        required:false,
    },
    categoryid:{
        type:Schema.Types.ObjectId,
        ref:'categories',

    },

    
    hsncode:{
        type:String,
        required:false
    },
    rateofgst:{
        type:String,
        required:false
    },
    height:{
        type:String,
        required:false
    },
    width:{
        type:String,
        required:false
    },
    length:{
        type:String,
        required:false
    },
    weight:{
        type:String,
        required:false
    },
    
    
    shortdescription:{
        type:String,
        required:false
    },
    longdescription:{
        type:String,
        required:false
    },
    specification:{
        type:String,
        required:false
    },
     
    coverphoto:[

    ],
    productimage1:[

    ],

    productimage2:[

    ],

    productimage3:[

    ],
    productimage4:[

    ],
    productimage5:[

    ],
    
    keywords:{
        type:String,
        required:false
    },
    metatags:{  
        type:String,
        required:false},
    metadescription:{
        type:String,
        required:false
    },
    QCStatus:{
        type:String,
        default:'Passed',
        required:false
    },
    QCFailedReason:{
        type:String,
        required:false
    },
    deleveryTerm:{
        type : String,
        required : false
    },
    createdBy:{
        type:String,
        require:true
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
    },

    

    filter_id:{
        type:Schema.Types.ObjectId,
        ref:'filters',
       
    },
    FilterValues:[{
        type:Schema.Types.ObjectId,
        ref:'filtervalues',
    } ],
    minimumquantityorder:{ 
        type:String,
        required : false,  
    },
 
    size:{
        type:String,
        required : false,    
    },
   colour:{
        type:String,
        required : false,    
    },
  price:{
        type:String,
        required : false,    
    },
   mrp:{
        type:String,
        required : false,    
    },
    gst:{
        type:String,
        required : false,  
    },
   
    listingminimumordequantity:{
        type:String,
        required : false,  
    },
    
    howmanypicesperset:{
        type:String,
        required : false,  
    },
  

    contentdetailofthisset:{
        type:String,
        required : false,  
    },

    noofcolourinthisset:{
        type:String,
        required : false,  
    },
   
    brandname:{
        type:String,
        required : false,  
    },
    designcode:{
        type:String,
        required : false,  
    },
    brandphoto:[ 

    ],
    countryoforigin:{
        type:String,
        required : false,  
    },
    listigexpiredays:{
        type:String,
        required : false,  
    },
    productdetails:{
        type:String,
        required : false,  
    },
    freedelivery:{
        type:String,
        required : false,    
    }







});

module.exports = mongoose.model('items',ItemSchema);