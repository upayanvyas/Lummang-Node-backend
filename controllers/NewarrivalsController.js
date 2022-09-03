const newarrivalModel = require('../models/Newarrival.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.getCreateNewarrivals =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('./newarrivals/createnewarrivals',{
                    category: category,
                    successmessage : successmessage, 
                    errormessage: errormessage
                });
                successmessage = null;
                errormessage=null;
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

//post create Dealsoftheday
module.exports.postCreateNewarrivals =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
            const image = req.file.filename;
            const description = req.body.description;
            const categoryid=req.body.categoryid;
            const deals = new newarrivalModel({
                
                image: image,
                description: description,
                categoryid:categoryid,
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/dealsoftheday/createdealsoftheday');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/dealsoftheday/createdealsoftheday');  
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
module.exports.getViewnewarrivals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            newarrivalModel.find({isDeleted:false}).populate('categoryid').exec(function(err,newarrival){
                res.render('./newarrivals/newarrivalsview',{
                    newarrival : newarrival,
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

module.exports.getEditnewarrivals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const newarrivalid = req.params.newarrivalid;
            newarrivalModel.findById(newarrivalid).populate('categoryid').then(newarrival=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('./newarrivals/newarrivalsedit',{
                        category: cate,
                        newarrival:newarrival
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

module.exports.postUpdatenewarrivals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const newarrivalid = req.body.newarrivalid;
            const categoryid = req.body.categoryid; 
            const image = req.file.filename;
            const description = req.body.description; 
            newarrivalModel.findById(newarrivalid).then(newarrival=>{
                newarrival.categoryid = categoryid;
                newarrival.image = image;
                newarrival.description=description;
                newarrival.updatedBy = req.session.userdetails.userid;
                newarrival.updatedOn = new Date()
                return newarrival.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getviewnewarrivals');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getviewnewarrivals');
            });
            }
            else{
                const newarrivalid = req.body.newarrivalid;
            const categoryid = req.body.categoryid;
            const description=req.body.description;
            newarrivalModel.findById(newarrivalid).then(newarrival=>{
                newarrival.description=description;
                newarrival.categoryid = categoryid;
                newarrival.updatedBy = req.session.userdetails.userid;

                newarrival.updatedOn = new Date()
                return newarrival.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getviewnewarrivals');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getviewnewarrivals');
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
module.exports.getDeletenewarrival =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const newarrivalid = req.params.newarrivalid;
            newarrivalModel.findById(newarrivalid).then(newarrival=>{
                newarrival.isDeleted = true;
                newarrival.deletedBy = req.session.userdetails.userid;
                newarrival.deletedOn = new Date()
                return newarrival.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/getviewnewarrivals');
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

module.exports.getApinewarrivals = (req,res,next) =>{
    newarrivalModel.find({isDeleted:false},function(err, newarrivals){
        res.status(200).json({
            StatusCode : 200,
            status : 'success',
            data : {
                newarrivals : newarrivals
            }
        })
    })
}

