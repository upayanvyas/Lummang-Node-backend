const ToptwoofferModel = require('../models/Toptwooffer.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

// get create top three offer 
module.exports.getCreateToptwooffer =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('toptwooffer/createtoptwooffer',{
                    category : category,
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

//post create top three offer

module.exports.postCreateToptwooffer =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            const description=req.body.description;
            const  offerdescription=req.body.offerdescription;
            const amountdescription=req.body.amountdescription;
            const offer = new ToptwoofferModel({
                categoryid: categoryid,
                image: image,
                description:description,
                amountdescription:amountdescription,
                offerdescription:offerdescription,
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            offer
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/createtoptwooffer');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createtoptwooffer');  
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

// view top three offer

module.exports.getViewToptwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            ToptwoofferModel.find({isDeleted:false}).populate('categoryid').exec(function(err,toptwooffer){
                
                res.render('toptwooffer/viewtoptwooffer',{
                    offer : toptwooffer,
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

//get edit Top three offer

module.exports.getEditToptwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const toptwoofferid = req.params.toptwoofferid;
            ToptwoofferModel.findById(toptwoofferid).populate('categoryid').then(offer=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('toptwooffer/edittoptwooffer',{
                        category: cate,
                        toptwooffer:offer 
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

module.exports.postUpdatetwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const toptwoofferid = req.body.toptwoofferid;
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            ToptwoofferModel.findById(toptwoofferid).then(toptwooffer=>{
                toptwooffer.categoryid = categoryid;
                toptwooffer.image = image;
                toptwooffer.updatedBy = req.session.userdetails.userid;
                toptwooffer.updatedOn = new Date()
                return toptwooffer.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/viewtoptwooffer');
            })  
            .catch(err=> {
                errormessage = err;
                res.redirect('/viewtoptwooffer');
            });
            }
            else{
                const toptwoofferid = req.body.toptwoofferid;
            const categoryid = req.body.categoryid;
            ToptwoofferModel.findById(toptwoofferid).then(toptwooffer=>{
                toptwooffer.categoryid = categoryid;
                toptwooffer.updatedBy = req.session.userdetails.userid;
                toptwooffer.updatedOn = new Date()
                return toptwooffer.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/viewtoptwooffer');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/viewtoptwooffer');
            });
            }            
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
module.exports.getDeleteToptwooffer =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const toptwoofferid = req.params.toptwoofferid;
            ToptwoofferModel.findById(toptwoofferid).then(toptwooffer=>{
                toptwooffer.isDeleted = true;
                toptwooffer.deletedBy = req.session.userdetails.userid;
                toptwooffer.deletedOn = new Date()
                return toptwooffer.save()
            })
            .then(result=>{
                successmessage = "offer Deleted Successfully";
                res.redirect('/viewtoptwooffer');
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
module.exports.gettoptwooffer = (req,res,next)=>{
    ToptwoofferModel.find({isDeleted:false}).populate('categoryid').exec(function(err,toptwooffer){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                toptwooffer : toptwooffer
            }
        };
        res.status(200).json(response);
    })
}