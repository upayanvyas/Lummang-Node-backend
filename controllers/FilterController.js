const filterModel = require('../models/Filter.Model');
var successmessage = null;
var errormessage = null; 


module.exports.getCreateFilter=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){
            
                res.render('filter/createfilter',{
                    successmessage:successmessage,
                    errormessage:errormessage
                });

                successmessage = null;
                errormessage = null;
           
         }
         else{  
            res.redirect('/login');

         }
    }
    else{
        res.redirect('/login');
    }
}



//Filter Insert Operation
module.exports.postCreateFilter = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            
                const filtername = req.body.filterName;
              
                const filteralias = req.body.filteralias;
                const filter = new filterModel(
                    {
                    filterName:filtername,
                    filteralias:filteralias,
                    createdBy:req.session.userdetails.userid,
                    createdon: new Date()
                }
                );
                filter
                    .save().then(result=>{
                        successmessage = 'Success';
                        console.log('Filter Created');
                        res.redirect('/createfilter');
                    })
                    .catch(err=>{
                        errormessage = err;
                        console.log(err);
                        res.redirect('/createfilter');
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

//Fiilter View Page
module.exports.getViewFilter = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            filterModel.find({isDeleted:false},function(err,filters){   
                res.render('filter/filterview',{
                    filters : filters,
                    successmessage : successmessage,
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


//delete filter

module.exports.getDeleteFilter =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'  ){        
            const FilterId = req.params.FilterId;
            filterModel.findById(FilterId).then(filter=>{
                filter.isDeleted = true;
                filter.deletedBy = req.session.userdetails.userid;;
                filter.updatedOn = new Date();
                return filter.save()
            }).then(result=>{
                successmessage= "Filter Deleted Successfully";
                res.redirect('/filterview');
            })
            .catch(err=> {
                errormessage=err;
                res.redirect('/filterview');
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


//edit filter
module.exports.getEditFilter = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const FilterId = req.params.FilterId;
            filterModel.findById(FilterId).then(filter=>{
            
                    res.render('filter/editfilter',{
                        filter: filter
                    });

               
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


//update filter

module.exports.postUpdateFilter = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const FilterId= req.params.FilterId;
            const FilterName = req.body.filterName;
           
            const filterAilas = req.body.filteralias;
            const updatedBy =  req.session.userdetails.userid;
            const updatedOn = new Date();
            filterModel.findById(FilterId).then(filter=>{
                filter.filterName = FilterName;
                filter.filteralias = filterAilas;
                filter.updatedBy = updatedBy;
                filter.updatedOn = updatedOn;
                return filter.save()
            }).then(result=>{
                successmessage= "Filter Updated Successfully";
                res.redirect('/filterview');
            })
            .catch(err=> {
                errormessage =err;
                res.redirect('/filterview');
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
