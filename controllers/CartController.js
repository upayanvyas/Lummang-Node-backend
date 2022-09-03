const CartModel = require ('../models/Cart.Model');



  
 

//view cart

module.exports.getViewCart =(req,res,next) =>{
    const customerid = req.params.customerid;
    CartModel.find({isDeleted:false,customerid:customerid}).populate('itemid').exec(function(err,cart){
        res.status(200).json({
            status: "success",
            statuscode : "200",
           
                cart:cart,
                status : "success",
                message : "views sucessfully",
          
        }) 
    })
     
}
    module.exports.getapiDeletecart = (req,res,next)=>{
    
        const CartId = req.params.CartId;
        const deletedBy = req.params.deletedBy
        CartModel.findById(CartId).then(cart=>{
            cart.isDeleted = true;
            cart.deletedBy =deletedBy; 
            cart.deletedOn = new Date()
             cart.save()
        })

            return res.status(200).json({
                status: "success",
                statuscode : "200",
               
                   
                    status : "success",
                    message : "delete sucessfully",
                    
              
            }) 
        
    
     
    }
    
    module.exports.getcountCart =(req,res,next) =>{
        const customerid = req.params.customerid;
        CartModel.find({isDeleted:false,customerid:customerid}).count(function(err,cart){
            res.status(200).json({
                status: "success",
                statuscode : "200",
               
                    cart:cart,
                    status : "success",
                    message : "views sucessfully",
              
            }) 
        })
         
    }

    module.exports.editquantity=(req,res,next) =>{
        const cartid=req.params._id
        
        const quantity=req.params.quantity;
        CartModel.findById(cartid).then(cart=>{
            cart.quantity=quantity;
            return cart.save()
        })
        
        return res.status(200).json({
            status: "success",
            statuscode : "200",
           
               
                status : "success",
                message : "update sucessfully",
                
          
        }) 
    }  

//create cart
    module.exports.getCart = async(req,res) =>{
        {
            const customerid = req.params.customerid;
            const itemid = req.params.itemid; 
            
            const quantity =req.params.quantity;
            const sellerid=req.params.sellerid;
            CartModel.findOne({isDeleted:false,itemid:itemid}).then(data=>{
                if(data){
                    data.quantity++
                     
                    data.save()  
                    //return res.status(200).send("otpsend")
                      return res.send(data);   
                }else{

                    
                    const customerid = req.params.customerid;
                    const itemid = req.params.itemid; 
                   
                    const sellerid=req.params.sellerid;
                    const quantity=1; 
                    const cart =new CartModel({ 
                        customerid:customerid,
                        itemid: itemid,
                       
                       
                        sellerid:sellerid,
                        quantity:quantity,

                    });
                    cart.save()
                    .then(result=>{
                        res.status(200).json({
                            status: "success",
                            statuscode : "200",
                            data :{
                                status : "success",
                                message : "insert successfully",
                            }
                        })
                    })
                    .catch(err=>{
                        res.status(200).json({
                            status: "success",
                            statuscode : "200",
                            data :{
                                status:'failed',
                               message : err
                            }
                        })
                    })
                

                
 
                   
        
                
                }
              
            })
            }
    }