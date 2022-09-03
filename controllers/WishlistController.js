const WishlistModel = require ('../models/Wishlist.Model');

//api for insert 

module.exports.getWishlist =(req,res,next)=>{
    const customerid = req.params.customerid;
    const itemid = req.params.itemid;
   
    const wishlist =new WishlistModel({
        customerid:customerid,
        itemid: itemid,
       
    });
    wishlist.save()
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

// api for view

module.exports.getViewWishlist =(req,res,next) =>{
    const customerid = req.params.customerid;
    WishlistModel.find({isDeleted:false,customerid:customerid}).populate('itemid').exec(function(err,wishlist){
        res.status(200).json({
            status: "success",
            statuscode : "200",
           
                wishlist:wishlist,
                status : "success",
                message : "views sucessfully",
          
        }) 
    })
    
}


//delete wishlist

module.exports.getapiDeletewishlist = (req,res,next)=>{
    
    const WishlistId = req.params.WishlistId;
    const deletedBy = req.params.deletedBy
    WishlistModel.findById(WishlistId).then(wishlist=>{
        wishlist.isDeleted = true;
        wishlist.deletedBy =deletedBy;
        wishlist.deletedOn = new Date()
      
         wishlist.save()
         return res.status(200).json({
            status: "success",
            statuscode : "200",
           
               
                status : "success",
                message : "delete sucessfully",
                
          
        }) 
    })

 
}





module.exports.apideletewishlistbyitemidandcustomerid =(req,res,next) =>{
    const customerid = req.params.customerid;
    const itemid=req.params.itemid;
    const deletedBy = req.params.deletedBy;
    WishlistModel.findOne({isDeleted:false,customerid:customerid,itemid:itemid}).then(wishlist=>{
        wishlist.isDeleted = true;
       wishlist.deletedBy=deletedBy
        wishlist.deletedOn = new Date()
         wishlist.save() 

        return res.status(200).json({
            status: "success",
            statuscode : "200",
           
               
                status : "success",
                message : "delete sucessfully",
                
          
        }) 
        
    })   
    
} 

module.exports.getwishlistbyitemidandcustomerid = (req,res,next)=>{
    const customerid = req.params.customerid;
    const itemid=req.params.itemid
    WishlistModel.find({customerid:customerid,itemid:itemid,isDeleted : false}).exec(function(err,Wishlistitem){
        res.status(200).json({
            status : 'success',
            statuscode : '200',
         
                message : 'success', 
                Wishlistitem : Wishlistitem 
             
            
        });
    }) 
}

