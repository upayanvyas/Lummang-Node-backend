const TrendingproductModel = require('../models/Trendingproduct2.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.gettrendingproduct2 =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('trendingproduct2/createtrendingproduct2',{
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
module.exports.postCreatetrendingproduct2=(req,res,next)=>{
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
module.exports.getviewtrendingproduct2 = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            TrendingproductModel.find({isDeleted:false}).populate('itemid').exec(function(err,Trendingproduct2){
                res.render('./trendingproduct2/viewtrendingproduct2',{
                    Trendingproduct2 : Trendingproduct2,
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

module.exports.getEditTrendingproduct2 = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const trendingproduct2id = req.params._id;
            TrendingproductModel.findById(trendingproduct2id).populate('itemid').then(trendingproduct2=>{
                ItemModel.find({isDeleted:false},function(err,item){
                
                    res.render('./trendingproduct2/edittrendingproduct2',{
                        item: item,
                        trendingproduct2:trendingproduct2
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

module.exports.postUpdatetrendingproduct2 = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
             const trendingproduct2id = req.body.trendingproduct2id;
            const itemid = req.body.itemid;
           
            TrendingproductModel.findById(trendingproduct2id).then(trendingproduct2=>{
                trendingproduct2.itemid = itemid;
                
                trendingproduct2.updatedBy = req.session.userdetails.userid;
                trendingproduct2.updatedOn = new Date()
                return trendingproduct2.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/gettrendingproduct2');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/gettrendingproduct2');
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
module.exports.getDeletetrendingproduct2 =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const trendingproduct2id = req.params._id;
            TrendingproductModel.findById(trendingproduct2id).then(trendingproduct2=>{
                trendingproduct2.isDeleted = true;
                trendingproduct2.deletedBy = req.session.userdetails.userid;
                trendingproduct2.deletedOn = new Date()
                return trendingproduct2.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/gettrendingproduct2');
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

module.exports.getapitrendingproduct2 = (req,res,next)=>{
    TrendingproductModel.find({isDeleted:false}).populate('itemid').exec(function(err,trendingproduct2){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                trendingproduct2 : trendingproduct2
            }
        };
        res.status(200).json(response);
    })
}