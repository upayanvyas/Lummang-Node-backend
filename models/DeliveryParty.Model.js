const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const DeliveryParty= new Schema({
    name :{
        type:String,
        required :true
    },
    phoneno : {
        type:String,
        required :true
    },
    userid :{
        type:String,
        required : true
    },
    password :{
        type:String,
        required : true
    },
    
  isDeleted: {
    type: Boolean,
    require: false,
    default: false
  }
})

module.exports = mongoose.model('deliveryparties',DeliveryParty);