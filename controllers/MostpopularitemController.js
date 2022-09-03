const MostpopularitemModel = require('../models/Mostpopularitem.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.getCreatemostpopularitem =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('mostpopularitem/createmostpopularitem',{
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
module.exports.postCreatemostpopularitem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new MostpopularitemModel({
                
                itemid: itemid,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='newarrivalitem created sucessfully';
                res.redirect('/createmostpopularitem');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createmostpopularitem');  
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
module.exports.getViewmostpopularitem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            MostpopularitemModel.find({isDeleted:false},function(err,mostpopularitem){
                res.render('./mostpopularitem/viewmostpopularitem',{
                    mostpopularitem : mostpopularitem,
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

module.exports.getEditmostpopularitem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const mostpopularitemid = req.params.mostpopularitemid;
            MostpopularitemModel.findById( mostpopularitemid).then( mostpopularitem=>{
                ItemModel.find({isDeleted:false},function(err,item){
                    res.render('./mostpopularitem/editmostpopularitem',{
                        item:item,
                        mostpopularitem:mostpopularitem
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

module.exports.postUpdatemostpopularitem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const mostpopularitemid= req.body.mostpopularitemid;
            const itemid = req.body.itemid;
           
            
            const updatedBy =  req.session.userdetails.userid;
            const updatedOn = new Date();
            MostpopularitemModel.findById(mostpopularitemid).then(mostpopularitem=>{
                mostpopularitem.itemid = itemid;
                
                mostpopularitem.updatedBy = updatedBy;
                mostpopularitem.updatedOn = updatedOn;
                return mostpopularitem.save()
            }).then(result=>{
                successmessage= "Filter Updated Successfully";
                res.redirect('/mostpopularitemview');
            })
            .catch(err=> {
                errormessage =err;
                res.redirect('/mostpopularitemview');
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
module.exports.getdeletemostpopularitem =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const mostpopularitemid = req.params.mostpopularitemid;
            MostpopularitemModel.findById(mostpopularitemid).then(mostpopularitem=>{
                mostpopularitem.isDeleted = true;
                mostpopularitem.deletedBy = req.session.userdetails.userid;
                mostpopularitem.deletedOn = new Date()
                return mostpopularitem.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/mostpopularitemview');
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

module.exports.getmostpopularitem = (req,res,next)=>{
    MostpopularitemModel.find({isDeleted:false}).populate('itemid').exec(function(err,mostpopularitem){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                mostpopularitem : mostpopularitem
            }
        };
        res.status(200).json(response);
    })
}

