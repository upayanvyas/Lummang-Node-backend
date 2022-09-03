const ImageSliderModel = require('../models/ImageSliderCms.Model');
const CategoryModel = require('../models/Category.Model');
var mongoose=require('mongoose');

var successmessage = null;
var errormessage = null;


//imageSliderCreatePage
module.exports.getImageSliderCreate = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             
            CategoryModel.find({isDeleted:false},function(err,category){
            res.render('cms/imageslidercreate',{
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

module.exports.postUpdateImageSlider = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
             if(req.file!=null || req.file!=undefined)
             {
             const imagesliderid = req.body.imagesliderid;
            const categoryid = req.body.categoryid;
            const image = req.file.filename;
           
            const caption = req.body.caption;
            const title = req.body.title;
            const subtitle = req.body.subtitle;
            
            ImageSliderModel.findById(imagesliderid).then(imageslider=>{
                imageslider.categoryid = categoryid;
                imageslider.image = image;
                imageslider.caption = caption;
                imageslider.title = title;
                imageslider.subtitle=subtitle;
                imageslider.updatedBy = req.session.userdetails.userid;
                imageslider.updatedOn = new Date()
                return imageslider.save()
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
                const imagesliderid = req.body.imagesliderid;
            const categoryid = req.body.categoryid;
            
            const caption = req.body.caption;
            const title=req.body.title;
            const subtitle= req.body.subtitle

            ImageSliderModel.findById(imagesliderid ).then(imageslider=>{
                imageslider.categoryid = categoryid;
                imageslider.caption = caption;
                imageslider.title = title;
                imageslider.subtitle = subtitle;
                imageslider.updatedBy = req.session.userdetails.userid;
                imageslider.updatedOn = new Date()
                return imageslider.save()
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

//imageSliderCreatePost
module.exports.postImageSliderCreate = (req,res,next)=>{
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
                    
                    const img = new ImageSliderModel({
                        image:image,
                        categoryid: categoryid,
                        caption: caption,
                        title: title,
                        subtitle: subtitle,
                        createdBy:req.session.userdetails.userid,
                        createdOn:new Date() 
                    });
                    img
                    .save()
                        .then(result=>{
                            successmessage = 'Image Slider Created Successfully';
                            res.redirect('/cms/imageslidercreate');
                        })
                        .catch(err=>{
                            errormessage = err;
                            res.redirect('/cms/imageslidercreate');
                        })
                }
                else
                {
                    errormessage = 'Invalid Image Format';
                    res.redirect('/cms/imageslidercreate');
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

module.exports.getEditimageslider = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const imagesliderid = req.params.imagesliderid;
            ImageSliderModel.findById(imagesliderid).populate('categoryid').then(imageslider=>{
                CategoryModel.find({isDeleted:false},function(err,cate){
                    res.render('./cms/editimageslider',{
                        category: cate,
                        imageslider:imageslider
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

//view
module.exports.getImageSliderView = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
            ImageSliderModel.find({isDeleted:false}).populate('categoryid').exec(function(err,imageslider){
                res.render('./cms/imagesliderview',{
                    imagesliders : imageslider,
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
            const imagesliderid = req.params.imagesliderid;
            ImageSliderModel.findById(imagesliderid).then(imageslider=>{
                        imageslider.isDeleted = true;
                        imageslider.deletedBy = req.session.userdetails.userid;
                        imageslider.deletedOn = new Date()
                        return imageslider.save()
            })
            .then(result=>{
                successmessage = "Image Slider Deleted Successfully";
                res.redirect('/imagesliderview');
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


//api api api api api api api api api api api api api api api api api api api api
module.exports.getApiImageSlides = (req,res,next)=>{
    ImageSliderModel.find({isDeleted:false}).populate('categoryid').exec(function(err,imageslider){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                imagesliders : imageslider
            }
        };
        res.status(200).json(response);
    })
}