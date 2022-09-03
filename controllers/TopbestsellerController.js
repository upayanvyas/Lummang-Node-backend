const TopbestsellerModel = require('../models/Topbestseller.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create topbestseller
module.exports.gettopbestseller =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('topbestseller/createtopbestseller',{
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

//post create topbestseller
module.exports.posttopbestseller=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new TopbestsellerModel({
                
                itemid: itemid,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='newarrivalitem created sucessfully';
                res.redirect('/createtopbestseller');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createtopbestseller');  
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
// view topbestseller
module.exports.getViewtopbestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            TopbestsellerModel.find({isDeleted:false}).populate('itemid').exec(function(err,topbestseller){
                res.render('./topbestseller/topbestsellerview',{
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

module.exports.getedittopbestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const topbestsellerid = req.params._id;
            TopbestsellerModel.findById(topbestsellerid).populate('itemid').then(topbestseller=>{
                ItemModel.find({isDeleted:false},function(err,item){
                    res.render('./topbestseller/edittopbestseller',{
                        item: item,
                        topbestseller:topbestseller 
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
 
//post update top bestseller

module.exports.postUpdatetopbestseller = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const  topbestsellerid= req.body.topbestsellerid;
            const itemid = req.body.itemid;
           
             
            const updatedBy =  req.session.userdetails.userid;
            const updatedOn = new Date();
            TopbestsellerModel.findById( topbestsellerid).then(topbestseller=>{
                topbestseller.itemid = itemid;
                
                topbestseller.updatedBy = updatedBy;
                topbestseller.updatedOn = updatedOn;
                return topbestseller.save()
            }).then(result=>{
                successmessage= "topbestseller Updated Successfully";
                res.redirect('/topbestsellerview');
            })
            .catch(err=> {
                errormessage =err;
                res.redirect('/topbestsellerview');
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
module.exports.getDeletetopbestseller =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const  topbestsellerid= req.params._id;
            TopbestsellerModel.findById(topbestsellerid).then(topbestseller=>{
                topbestseller.isDeleted = true;
                topbestseller.deletedBy = req.session.userdetails.userid;
                topbestseller.deletedOn = new Date()
                return topbestseller.save()
            })
            .then(result=>{
                successmessage = "topbestseller Deleted Successfully";
                res.redirect('/topbestsellerview');
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

module.exports.getapibestseller = (req,res,next)=>{
    TopbestsellerModel.find({isDeleted:false}).populate('itemid').exec(function(err,topbestseller){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                topbestseller : topbestseller
            }
        };
        res.status(200).json(response);
    })
}
