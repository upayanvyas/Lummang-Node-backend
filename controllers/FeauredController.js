const FeaturedModel = require('../models/Feaured.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.getCreatefeatureditem =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('featured/createfeatured',{
                    item : item,
                    successmessage : successmessage,
                    errormessage: errormessage
                });
                successmessage = null;
                errormessage=null;
            
         })
        }
         else{
            res.redirect('/login');
         }
    }
    else{
        res.redirect('/login');
    }
}

//post create Dealsoftheday
module.exports.postCreatefeatureditem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new FeaturedModel({
                
                itemid: itemid,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='newarrivalitem created sucessfully';
                res.redirect('/createnewarrivalsitem');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createnewarrivalsitem');  
            })
        }
        else
        {
            res.redirect('/login');
        }
    }
    else{
        res.redirect('/login');
    } 
}
// view dealsoftheday
module.exports.getfeatureditem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            FeaturedModel.find({isDeleted:false}).populate('itemid').exec(function(err,featured){
                res.render('./featured/featuredview',{
                    featured : featured,
                    successmessage : successmessage,
                    errormessage:errormessage
                });
                successmessage = null;
                errormessage = null;
            })
        }
        else{
            res.redirect('/login');
        }
    }
    else{
        res.redirect('/login');
    }
}

//get edit deals of the day

module.exports.getEditFeatureditem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const featureditemid = req.params._id;
            FeaturedModel.findById(featureditemid).populate('itemid').then(featureditem=>{
                ItemModel.find({isDeleted:false},function(err,item){
                    res.render('./featured/featurededit',{
                        item: item, 
                        featureditem:featureditem
                    });
                })
            
                    

               
            }); 
            
        }
        else{
           res.redirect('/login');
        }
   }
   else{
       res.redirect('/login');
   }
}

//post update deals of the day

module.exports.postUpdatefeaturedproduct = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
             const featuredproductid = req.body._id;
            const itemid = req.body.itemid;
           
            FeaturedModel.findById(featuredproductid).then(featuredproduct=>{
                featuredproduct.itemid = itemid;
                
                featuredproduct.updatedBy = req.session.userdetails.userid;
                featuredproduct.updatedOn = new Date()
                return featuredproduct.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/getfeatureditem');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getfeatureditem');
            });
                     
        }
        else{
           res.redirect('/login');
        }
   }
   else{
       res.redirect('/login');
   }
}

//Delete dealsoftheday
module.exports.getDeletefeatureditem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const featureditemid = req.params._id;
            FeaturedModel.findById(featureditemid).then(featureditem=>{
                featureditem.isDeleted = true;
                featureditem.deletedBy = req.session.userdetails.userid;
                featureditem.deletedOn = new Date()
                return featureditem.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/getfeatureditem');
        })
    }
    else{
        res.redirect('/login');
    }
}
else{
res.redirect('/login');
}
}

module.exports.getmostfeaured = (req,res,next)=>{
    FeaturedModel.find({isDeleted:false}).populate('itemid').exec(function(err,mostfeaured){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                mostfeaured : mostfeaured
            }
        };
        res.status(200).json(response);
    })
}


module.exports.apiGetallfeatureditem = (req,res,next)=>{
    
    var agg = [
        {
            $lookup: {
                from: "inventories", // collection name in db
                let: { mitemid: "$_id" },
                pipeline: [
                    { $match:
                       { $expr:
                          { $and:
                              [
                               { $eq: [ "$isDeleted",  false] },
                               { $eq: [ "$itemid",  "$$mitemid"] },
                               { $gte: [ "$currentstock",  1] },
                               
                             ]
                          },
                       }
                    },
                    {
                        $sort:{sellingprice : 1}
                    },
                   
                 ],
                as: "inventories"
            }
        },
        {
            $match: { 
                
                isDeleted: false,  
            }
        },
    ]

    ItemModel.aggregate(agg).exec(function(err, items) {
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                items : items
            }
        };
        res.send(response);
    })
   
}