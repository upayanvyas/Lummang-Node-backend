const newarrivalitemModel = require('../models/newarrivalsitem.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.getCreateNewarrivalsitem =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('newarrivalsitem/newarrivalsitemcreate',{
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
module.exports.postCreateNewarrivalsitem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new newarrivalitemModel({
                
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
module.exports.newarrivalsitemview = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            newarrivalitemModel.find({isDeleted:false}).populate('itemid').exec(function(err,newarrivalitem){
                res.render('./newarrivalsitem/newarrivalsitemview',{
                    newarrivalitem : newarrivalitem,
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

module.exports.getEditnewarrivalsitem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const newarrivalsitemid = req.params._id;
            newarrivalitemModel.findById(newarrivalsitemid).populate('itemid').then(newarrivalsitem=>{
                ItemModel.find({isDeleted:false},function(err,item){  
                    res.render('./newarrivalsitem/newarrivalsitemedit',{
                        item: item,
                        newarrivalsitem:newarrivalsitem
                    });
                });
               
             
                    
 
               
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

module.exports.postUpdatenewarrivalitem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
             const newarrivalitemid = req.body._id;
            const itemid = req.body.itemid;
           
            newarrivalitemModel.findById(newarrivalitemid).then(newarrivalitem=>{
                newarrivalitem.itemid = itemid;
                
                newarrivalitem.updatedBy = req.session.userdetails.userid;
                newarrivalitem.updatedOn = new Date()
                return newarrivalitem.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/newarrivalsitemview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/newarrivalsitemview');
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
module.exports.getdeletenewarrivalsitem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const newarrivalitemid = req.params._id;
            newarrivalitemModel.findById(newarrivalitemid).then(newarrivalitem=>{
                newarrivalitem.isDeleted = true;
                newarrivalitem.deletedBy = req.session.userdetails.userid;
                newarrivalitem.deletedOn = new Date()
                return newarrivalitem.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/newarrivalsitemview');
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

module.exports.getnewarrivalsitem = (req,res,next)=>{
    newarrivalitemModel.find({isDeleted:false}).populate('itemid').exec(function(err,newarrivalitem){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                newarrivalitem : newarrivalitem
            }
        };
        res.status(200).json(response);
    })
}

