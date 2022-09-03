const TopcategoriesModel = require('../models/Topcategories.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

// get create top categories 
module.exports.getCreateTopcategories =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('topcategories/createtopcategories',{
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

//post create top categories

module.exports.postCreateTopcategories =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            const description=req.body.description;
            
            const categories = new TopcategoriesModel({
                categoryid: categoryid,
                image: image,
                description:description,
                
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            categories
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/createtopcategories');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createtopcategories');  
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

// view top categories

module.exports.getViewTopcategories = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            TopcategoriesModel.find({isDeleted:false}).populate('categoryid').exec(function(err,topcategories){
                
                res.render('topcategories/topcategoriesview',{
                    topcategories : topcategories,
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

//get edit Top categories

module.exports.getEditTopcategories = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            
            const  topcatgoriesid = req.params._id;
            TopcategoriesModel.findById(topcatgoriesid).populate('categoryid').then(topcategories=>{
                CategoryModel.find({isDeleted:false},function(err,category){
                    res.render('topcategories/topcategoriesedit',{
                        topcategories:topcategories,
                         category: category,
                        
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

module.exports.postUpdatetopcategories = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const topcatgoriesid = req.params._id;
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            const description = req.body.description; 
            TopcategoriesModel.findById(topcatgoriesid).then(topcatgories=>{
                topcatgories.categoryid = categoryid;
                topcatgories.image = image;
                topcatgories.description=description;
                topcatgories.updatedBy = req.session.userdetails.userid;
                topcatgories.updatedOn = new Date()
                return topcatgories.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getViewTopcategories');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getViewTopcategories');
            });
            }
            else{
                const topcategoriesid = req.params._id;
            const categoryid = req.body.categoryid;
            const description=req.body.description;
            TopcategoriesModel.findById(topcategoriesid).then(topcategories=>{
                topcategories.description=description;
                topcategories.categoryid = categoryid;
                topcategories.updatedBy = req.session.userdetails.userid;

                topcategories.updatedOn = new Date()
                return topcategories.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getViewTopcategories');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getViewTopcategories');
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
module.exports.getDeleteTopcategories =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const topcategoriesid = req.params.topcategoriesid;
            TopcategoriesModel .findById(topcategoriesid).then(toptwooffer=>{
                toptwooffer.isDeleted = true;
                toptwooffer.deletedBy = req.session.userdetails.userid;
                toptwooffer.deletedOn = new Date()
                return toptwooffer.save()
            })
            .then(result=>{
                successmessage = "offer Deleted Successfully";
                res.redirect('/getViewTopcategories');
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
module.exports.gettopcategories = (req,res,next)=>{
    TopcategoriesModel.find({isDeleted:false}).populate('categoryid').exec(function(err,topcategories){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                topcategories : topcategories
            }
        };
        res.status(200).json(response);
    })
}