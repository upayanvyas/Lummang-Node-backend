const TrendingproductModel = require('../models/trendingproduct.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.gettrendingproduct =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('trendingproduct/createtrendingproduct',{
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
module.exports.postCreatetrendingproduct=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            
            const deals = new TrendingproductModel({
                
                itemid: itemid,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='newarrivalitem created sucessfully';
                res.redirect('/createtrendingproduct');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createtrendingproduct');  
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
module.exports.getviewtrendingproduct = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            TrendingproductModel.find({isDeleted:false}).populate('itemid').exec(function(err,Trendingproduct){
                res.render('./trendingproduct/trendingproductview',{
                    Trendingproduct : Trendingproduct,
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

module.exports.getEditTrendingproduct = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const trendingproductid = req.params._id;
            TrendingproductModel.findById(trendingproductid).populate('itemid').then(trendingproduct=>{
                ItemModel.find({isDeleted:false},function(err,item){
                
                    res.render('./trendingproduct/edittrendingproduct',{
                        item: item,
                        trendingproduct:trendingproduct
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

module.exports.postUpdatetrendingproduct = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
             const trendingproductid = req.body.trendingproductid;
            const itemid = req.body.itemid;
           
            TrendingproductModel.findById(trendingproductid).then(trendingproduct=>{
                trendingproduct.itemid = itemid;
                
                trendingproduct.updatedBy = req.session.userdetails.userid;
                trendingproduct.updatedOn = new Date()
                return trendingproduct.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/gettrendingproduct');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/gettrendingproduct');
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
//Delete dealsoftheday
module.exports.getDeletetrendingproduct =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const trendingproductid = req.params._id;
            TrendingproductModel.findById(trendingproductid).then(trendingproduct=>{
                trendingproduct.isDeleted = true;
                trendingproduct.deletedBy = req.session.userdetails.userid;
                trendingproduct.deletedOn = new Date()
                return trendingproduct.save()
            })
            .then(result=>{ 
                successmessage = "deal Deleted Successfully";
                res.redirect('/gettrendingproduct');
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

//api api api api api api api api api api api api api api api api api api api api
module.exports.getapitrendingproduct = (req,res,next)=>{
    TrendingproductModel.find({isDeleted:false}).populate('itemid').exec(function(err,trendingproduct){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                trendingproduct : trendingproduct
            }
        };
        res.status(200).json(response);
    })
}