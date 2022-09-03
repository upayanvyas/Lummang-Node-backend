const BestsellerModel = require('../models/Bestseller.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create bestseller
module.exports.getCreatebestselleritem =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('bestseller/createbestseller',{
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

//post create bestseller
module.exports.postCreatebestseller =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new BestsellerModel({
                
                itemid: itemid,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='bestselleritem created sucessfully';
                res.redirect('/createbestseller');
            }) 
            .catch(err=>{
                errormessage = err;
                res.redirect('/createbestseller');  
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
// view bestseller 
module.exports.getViewbestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            BestsellerModel.find({isDeleted:false}).populate('itemid').exec(function(err,topbestseller){
                res.render('./bestseller/viewbestseller',{
                    topbestseller : topbestseller,
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

module.exports.geteditbestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const bestsellerid = req.params._id;
            BestsellerModel.findById(bestsellerid).populate('itemid').then(bestseller=>{
                ItemModel.find({isDeleted:false},function(err,item){
                    res.render('./bestseller/editbestseller',{
                        item: item,
                        bestseller:bestseller 
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

//post update bestseller

module.exports.postUpdatebestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const  bestsellerid= req.body.bestsellerid;
            const itemid = req.body.itemid;
           
             
            const updatedBy =  req.session.userdetails.userid;
            const updatedOn = new Date();
            BestsellerModel.findById( bestsellerid).then(bestseller=>{
                bestseller.itemid = itemid;
                
                bestseller.updatedBy = updatedBy;
                bestseller.updatedOn = updatedOn;
                return bestseller.save()
            }).then(result=>{
                successmessage= "Filter Updated Successfully";
                res.redirect('/bestsellerview');
            })
            .catch(err=> {
                errormessage =err;
                res.redirect('/bestsellerview');
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


//Delete bestseller
module.exports.getDeletebestseller =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const  bestsellerid= req.params._id;
            BestsellerModel.findById(bestsellerid).then(bestseller=>{
                bestseller.isDeleted = true;
                bestseller.deletedBy = req.session.userdetails.userid;
                bestseller.deletedOn = new Date()
                return bestseller.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/bestsellerview');
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

module.exports.getApibestseller  = (req,res,next)=>{
    BestsellerModel.find({isDeleted:false}).populate('itemid').exec(function(err,bestseller ){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                bestseller  : bestseller 
            } 
        };
        res.status(200).json(response); 
    })
}




