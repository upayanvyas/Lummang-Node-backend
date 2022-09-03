var imageurl= null;
var successmessage = null;
var errormessage = null;

exports.getImageUpload= (req,res,next)=>{
    
            console.log(imageurl);
            res.render('item/imageupload',{
                images: imageurl,
                successmessage : successmessage,
                errormessage : errormessage
            });
            images =null;
            successmessage = null;
            errormessage = null;
        } 
     

module.exports.postImageUpload=(req,res,next)=>{
    console.log(imageurl);
             imageurl =req.files;
             successmessage = 'success';
             
           res.send(imageurl)
            
  
}