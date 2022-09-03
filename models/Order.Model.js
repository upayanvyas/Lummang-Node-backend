const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    orderNo : {
        type:String,
        required: true
    },
    invoiceNo:{
        required : false,
        type:String,
    },
    invoiceDate:{
        required : false,
        type:Date
    },
    orderDatetime :{
        required : true,
        type :Date
    },
    customerid : {
        required :true,
        type :String
    },

    email: {
        type: String,
        require: true
    },
    fullname: {
        type: String,
        require: true
    },
    
   
    pincode:{
        type:String,
        require:true
    },
    locality:{
        type:String,
        require:false
    },
    address:{
        type:String,
        required:true
    },
    
    phoneno:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    
    addresstype:{
        type:String, 
        
    },
    itemid:{
        type:Schema.Types.ObjectId, 
       
        ref: 'items', 
        required:false
    },

    itemdetails:[
        
 
    ],
    orderstatus:{
        type:String,
        required:true,
        default : 'orderplaced'
    },
    currentorderstatusdatetime:{
        type :Date,
        required : false
    },
    canceledby:{
        type : String,
        required : false
    },
    canceledReason : {
        type:String,
        required: false
    },
    status:[
        
    ],
    deliveryparty:{
        type:String,
        required : false
    },
    scheduledPickupdateTime:{
        type : Date,
        required :false
    },
    deliveryOTP:{
        type:String,
        required : false
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
    paymentmode:{
        type:String,
        required:false
    },
    transactionrefno:{
        type:String,
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
})


module.exports = mongoose.model('orders',OrderSchema)