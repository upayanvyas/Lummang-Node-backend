
const promotionbannermodel = require('../models/promotionbanner.Model');
const CategoryModel = require('../models/Category.Model');
var mongoose=require('mongoose');

var successmessage = null;
var errormessage = null;


//imageSliderCreatePage
module.exports.getpromotionbannerCreate = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             
            CategoryModel.find({isDeleted:false},function(err,category){
            res.render('promotionsbanner/createpromotionbanner',{
                category: category,
                successmessage: successmessage,
                errormessage:errormessage
            });
            successmessage = null;
            errormessage = null;
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


//imageSliderCreatePost
module.exports.postpromotionbannerCreate = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
                console.log(req.file);
                const Image = req.file;
                if(Image)
                {    
                    const image = Image.filename;
                    const categoryid = req.body.categoryid;
                    const caption = req.body.caption;
                    const title = req.body.title;
                    const subtitle = req.body.subtitle;
                    const description=req.body.decription
                    
                    const img = new promotionbannermodel({
                        image:image,
                        categoryid: categoryid,
                        caption: caption,
                        title: title,
                        subtitle: subtitle,
                        description:description,
                        createdBy:req.session.userdetails.userid,
                        createdOn:new Date() 
                    });
                    img
                    .save()
                        .then(result=>{
                            successmessage = 'Image Slider Created Successfully';
                            res.redirect('/createpromotionbanner');
                        })
                        .catch(err=>{
                            errormessage = err;
                            res.redirect('/createpromotionbanner'); 
                        })
                }
                else
                {
                    errormessage = 'Invalid Image Format';
                    res.redirect('/createpromotionbanner');
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



//view
module.exports.getpromotionbannerview = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
            promotionbannermodel.find({isDeleted:false},function(err,promotionbanner){
                res.render('./promotionsbanner/promotionbannerview',{
                    promotionbanner : promotionbanner,
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





//delete
module.exports.getDeleteImageSlider=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){ 
            const promotionbannerid = req.params._id;
            promotionbannermodel.findById(promotionbannerid).then(promotionbanner=>{
                promotionbanner.isDeleted = true;
                promotionbanner.deletedBy = req.session.userdetails.userid;
                promotionbanner.deletedOn = new Date()
                        return promotionbanner.save()
            })
            .then(result=>{
                successmessage = "Image Slider Deleted Successfully";
                res.redirect('/getpromotionbanner');
            })
            .catch(err=> console.log(err));
        }
        else{
           res.redirect('/login');
        }
   }
   else{
       res.redirect('/login');
   }
}

module.exports.getEditpromotionbanner = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const promotionbannerid = req.params._id;
            promotionbannermodel.findById(req.params._id).populate('categoryid').then(promotionbanner=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('promotionsbanner/editpromotionbanner',{
                        category: cate,
                        promotionbanner:promotionbanner
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
module.exports.postUpdatepromotionbanner = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const promotionbannerid = req.body._id;
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
            const caption = req.body.caption;
            const title = req.body.title;
            const subtitle = req.body.subtitle;
            const description=req.body.decription
            promotionbannermodel.findById(promotionbannerid).then(promotionbanner=>{
                promotionbanner.categoryid = categoryid;
                promotionbanner.image = image;
                promotionbanner.caption = caption;
                promotionbanner.title = title;
                promotionbanner.subtitle = subtitle;
                promotionbanner.description = description;
                promotionbanner.updatedBy = req.session.userdetails.userid;
                promotionbanner.updatedOn = new Date()
                return promotionbanner.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getpromotionbanner');
            }) 
            .catch(err=> {
                errormessage = err;
                res.redirect('/getpromotionbanner');
            });
            }
            else{
                const promotionbannerid = req.body._id;
            const categoryid = req.body.categoryid;
            const caption = req.body.caption;
            const title = req.body.title;
            const subtitle = req.body.subtitle;
            const description=req.body.decription;
            promotionbannermodel.findById(promotionbannerid).then(promotionbanner=>{

               promotionbanner.categoryid = categoryid;
               
                promotionbanner.caption = caption;
                promotionbanner.title = title;
                promotionbanner.subtitle = subtitle;
                promotionbanner.description = description;
                promotionbanner.updatedBy = req.session.userdetails.userid;
                promotionbanner.updatedOn = new Date()
                return promotionbanner.save()
            }).then(result=>{
                successmessage = "offer Updated Successfully";
                res.redirect('/getpromotionbanner');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/getpromotionbanner');
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
//api api api api api api api api api api api api api api api api api api api api
module.exports.getpromotionbanner = (req,res,next)=>{
    promotionbannermodel.find({isDeleted:false}).populate('categoryid').exec(function(err,promotionbanner){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                promotionbanner : promotionbanner
            }
        };
        res.status(200).json(response);
    })


    
}