var imageurl= null;
var successmessage = null;
var errormessage = null;

module.exports.getImageUpload= (req,res,next)=>{
    {
            console.log(imageurl);
           return res.render({
                images: imageurl,
                successmessage : successmessage,
                errormessage : errormessage
            });
            images =null;
            successmessage = null;
            errormessage = null;
        } 
      
}
module.exports.postImageUpload=(req,res,next)=>{
   {
             imageurl = req.files;
             successmessage = 'success';
           return res.send('success')
            
        }
    }
