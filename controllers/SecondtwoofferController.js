const Secondtwooffermodel = require('../models/Secondtwooffer.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

// get create top three offer 
module.exports.getCreatesecondtwooffer =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            CategoryModel.find({isDeleted:false},function(err,category){
                res.render('secondtwooffer/secondtwooffercreate',{
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

module.exports.postsecondToptwooffer =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            const description=req.body.description;
            const title=req.body.title;
           
            const offer = new Secondtwooffer({
                categoryid: categoryid,
                image: image,
                description:description,
               title:title,
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            offer
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/createsecondtwooffer');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createsecondtwooffer');  
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

module.exports.getViewsecondToptwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            Secondtwooffermodel.find({isDeleted:false}).populate('categoryid').exec(function(err,secondtwooffer){
                
                res.render('secondtwooffer/secondtwoofferview',{
                    secondtwooffer : secondtwooffer,
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

module.exports.getEditsecondToptwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const secondtoptwoofferid = req.params._id;
            Secondtwooffermodel.findById(secondtoptwoofferid).populate('categoryid').then(secondtwooffer=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('secondtwooffer/secondtwoofferedit',{
                        category: cate,
                        secondtwooffer:secondtwooffer
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

module.exports.postUpdatesecondtwooffer = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const secondtoptwoofferid = req.body.secondtoptwoofferid;
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            Secondtwooffermodel.findById(secondtoptwoofferid).then(secondtwooffer=>{
                 secondtwooffer.categoryid = categoryid;
                secondtwooffer.image = image;
                secondtwooffer.updatedBy = req.session.userdetails.userid;
                secondtwooffer.updatedOn = new Date()
                return secondtwooffer.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/secondtwoofferview');
            }) 
            .catch(err=> {
                errormessage = err;
                res.redirect('/secondtwoofferview');
            });
            }
            else{
                const secondtoptwoofferid = req.body.secondtoptwoofferid;
            const categoryid = req.body.categoryid;
            Secondtwooffermodel.findById(secondtoptwoofferid).then(secondtwooffer=>{
                secondtwooffer.categoryid = categoryid;
                secondtwooffer.updatedBy = req.session.userdetails.userid;
                secondtwooffer.updatedOn = new Date()
                return secondtwooffer.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/secondtwoofferview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/secondtwoofferview');
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
module.exports.getDeletesecondtwooffer =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const secondtoptwoofferid = req.params._id;
            Secondtwooffermodel.findById(secondtoptwoofferid).then(secondtwooffer=>{
                secondtwooffer.isDeleted = true;
                secondtwooffer.deletedBy = req.session.userdetails.userid;
                secondtwooffer.deletedOn = new Date()
                return secondtwooffer.save()
            })
            .then(result=>{
                successmessage = "offer Deleted Successfully";
                res.redirect('/secondtwoofferview');
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
module.exports.getsecondtoptwooffer = (req,res,next)=>{
    Secondtwooffermodel.find({isDeleted:false}).populate('categoryid').exec(function(err,secondtwooffer){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                secondtwooffer : secondtwooffer
            }
        };
        res.status(200).json(response);
    })
}