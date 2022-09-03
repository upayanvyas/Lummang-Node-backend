const DealsofthedayModel = require('../models/Dealsoftheday.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

//create Dealsoftheday
module.exports.getCreateDealsoftheday =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('./dealsoftheday/createdealsoftheday',{
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

//post create Dealsoftheday
module.exports.postCreateDealsoftheday =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const categoryid = req.body.categoryid;
            const categoryicon = req.file.filename;
            const description = req.body.description;
            const offerdescription = req.body.offerdescription;
            const offercode=req.body.offercode;
            const deals = new DealsofthedayModel({
                categoryid: categoryid,
                categoryicon: categoryicon,
                description: description,
                offerdescription: offerdescription,
                offercode:offercode,
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/createdealsoftheday');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createdealsoftheday');  
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
module.exports.getViewDealsoftheday = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            DealsofthedayModel.find({isDeleted:false}).populate('categoryid').exec(function(err,dealsoftheday){
                res.render('dealsoftheday/viewdealsoftheday',{
                    deals : dealsoftheday,
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

module.exports.getEditDealsoftheday = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const dealsofthedayid = req.params.dealsofthedayid;
            DealsofthedayModel.findById(dealsofthedayid).populate('categoryid').then(deals=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('./dealsoftheday/editdealsoftheday',{
                        category: cate,
                        dealsoftheday:deals
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

module.exports.postUpdateDealsoftheday = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const dealsofthedayid = req.body.dealsofthedayid;
            const categoryid = req.body.categoryid;
            const categoryicon = req.file.filename;
            const description = req.body.description;
            const offerdescription = req.body.offerdescription;
            const offercode=req.body.offercode;
            DealsofthedayModel.findById(dealsofthedayid).then(dealsoftheday=>{
                dealsoftheday.categoryid = categoryid;
                dealsoftheday.categoryicon = categoryicon;
                dealsoftheday.description = description;
                dealsoftheday.offerdescription = offerdescription;
                dealsoftheday.offercode=offercode;
                dealsoftheday.updatedBy = req.session.userdetails.userid;
                dealsoftheday.updatedOn = new Date()
                return dealsoftheday.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/viewdealsoftheday');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/viewdealsoftheday');
            });
            }
            else{
                const dealsofthedayid = req.body.dealsofthedayid;
            const categoryid = req.body.categoryid;
            const description = req.body.description;
            const offerdescription = req.body.offerdescription;
            DealsofthedayModel.findById(dealsofthedayid).then(dealsoftheday=>{
                dealsoftheday.categoryid = categoryid;
                dealsoftheday.description = description;
                dealsoftheday.description = offerdescription;
                dealsoftheday.updatedBy = req.session.userdetails.userid;
                dealsoftheday.updatedOn = new Date()
                return dealsoftheday.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/viewdealsoftheday');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/viewdealsoftheday');
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
module.exports.getDeleteDealsoftheday =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const dealsofthedayid = req.params.dealsofthedayid;
            DealsofthedayModel.findById(dealsofthedayid).then(dealsoftheday=>{
                dealsoftheday.isDeleted = true;
                dealsoftheday.deletedBy = req.session.userdetails.userid;
                dealsoftheday.deletedOn = new Date()
                return dealsoftheday.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/viewdealsoftheday');
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

module.exports.getApiDealsOftheday = (req,res,next) =>{
    DealsofthedayModel.find({isDeleted:false},function(err, deals){
        res.status(200).json({
            StatusCode : 200,
            status : 'success',
            data : {
                deals : deals
            }
        })
    })
}