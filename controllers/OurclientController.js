const ourclientModel = require('../models/ourclient.Model');
const CategoryModel = require('../models/Category.Model');
var successmessage = null;
var errormessage = null;

//create createourclient
module.exports.getCreateourclient =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            {
                res.render('./ourclients/createourclients',{
                   
                    successmessage : successmessage,
                    errormessage: errormessage
                });
                successmessage = null;
                errormessage=null;
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

//post create ourclient
module.exports.postCreateDealsoftheday =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const image = req.file.filename;
            const description = req.body.description;
            
            const client = new ourclientModel({              
                image: image,
                description: description,
               
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            client
            .save()
            .then(result=>{
                successmessage ='deals created sucessfully';
                res.redirect('/createourclients');
            })
            .catch(err=>{
                errormessage = err;
                res.redirect('/createourclients');  
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
module.exports.getViewourclients = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            ourclientModel.find({isDeleted:false},function(err,ourclients){
                res.render('./ourclients/viewourclients',{
                    ourclients : ourclients,
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

module.exports.getEditourclients = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const ourclientsid = req.params._id;
            ourclientModel.findById(ourclientsid).then(ourclients=>{
                
                    res.render('./ourclients/editourclients',{
                       
                        ourclients:ourclients
                    });
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

//post update deals of the day

module.exports.postUpdateourclient = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const ourclientsid = req.body._id;
            const description = req.body.description;
            const image = req.file.filename;
            ourclientModel.findById(ourclientsid).then(ourclient=>{
                ourclient.description = description;
                ourclient.image = image;
                ourclient.updatedBy = req.session.userdetails.userid;
                ourclient.updatedOn = new Date()
                return ourclient.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/ourclientsview');
            }) 
            .catch(err=> {
                errormessage = err;
                res.redirect('/ourclientsview');
            });
            }
            else{
                const ourclientsid = req.body._id;
            const description = req.body.description;
            ourclientModel.findById(ourclientsid).then(ourclient=>{
                ourclient.description  = description;
                ourclient.updatedBy = req.session.userdetails.userid;
                ourclient.updatedOn = new Date()
                return ourclient.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/ourclientsview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/ourclientsview');
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
module.exports.getDeleteourclient=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const ourclientsid = req.params._id;
            ourclientModel.findById( ourclientsid).then(ourclients=>{
                ourclients.isDeleted = true;
                ourclients.deletedBy = req.session.userdetails.userid;
                ourclients.deletedOn = new Date()
                return ourclients.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/ourclientsview');
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

module.exports.getApiclint = (req,res,next) =>{
    ourclientModel.find({isDeleted:false},function(err, client){
        res.status(200).json({
            StatusCode : 200,
            status : 'success',
            data : {
                client : client
            }
        })
    })
}