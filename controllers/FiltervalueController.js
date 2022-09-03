const filtervalueModel = require('../models/Filtervalue.Model');
const filterModel = require('../models/Filter.Model');
var successmessage =null;
var errormessage = null;


module.exports.getCreateFilterValue = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            filterModel.find({isDeleted:false},function(err,filter){
                res.render('./filter/createfiltervalue',{
                    filters: filter,
                    successmessage :successmessage,
                    errormessage:errormessage
                });
                successmessage=null;
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



//create filter value

exports.postFilterValueCreate = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const filtervalue = req.body.filtervalue;
            const filter_id = req.body.filter_id;
            const filter = new filtervalueModel({
                filtervalue: filtervalue,
                filter_id:filter_id,
                createdBy:req.session.userid,
                createdOn:new Date() 
            });
            filter
                .save()
                .then(result=>{
                    successmessage = 'success';
                    console.log('Filter Value Created');
                    res.redirect('/createfiltervalue');
                })
                .catch(err=>{
                    errormessage = err;
                    console.log(err);
                    res.redirect('/createfiltervalue');
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







//for delete
module.exports.getDeleteFilterValues = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
                const filtervalue_id = req.params.FilterValueId;
                filtervalueModel.findById(filtervalue_id).then(filtervalue=>{
                    filtervalue.isDeleted=true;
                    filtervalue.deletedBy=req.session.userdetails.userid;;
                    filtervalue.deletedOn = new Date();
                    return filtervalue.save()
                }).then(result=>{
                    
                    res.redirect('/filtervalueview');
                })
                .catch(err=> {
                    errormessage =  err;
                    res.redirect('/filtervalueview');
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

//get filter by id
module.exports.getEditFilterValue = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
                const filtervalue_id = req.params.FilterValueId;
                filtervalueModel.findById(filtervalue_id).populate('filter_id').then(filtervalues=>{
                    filterModel.find({isDeleted:false},function(err,filter){
                        res.render('./filter/editfiltervalue',{
                            filter:filter,
                            filtervalues:filtervalues
                        });
                    })
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




//show all filtervalue

module.exports.getFilterValuesView = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            filtervalueModel.find({isDeleted:false}).populate('filter_id').exec(function(err,filtervalues){
                res.render('./filter/filtervalueview',{
                    filtervalues: filtervalues,
                    successmessage :successmessage,
                    errormessage:errormessage
                });
                successmessage=null;
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



//api
module.exports.apigetFilterValueByFiterId = (req,res,next)=>{
    const FilterId =  req.params.FilterId
    filtervalueModel
       .find({filter_id:FilterId,isDeleted:false})
       .exec(function(err,result){
            const response = {
               StatusCode:200,
               Status:'Success',
               data:{
                   filtervalues :result
               }
           }
           res.send(response);
       })
}

//update filtervalue
module.exports.postUpdateFilterValue = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const filtervallueid = req.params.FilterValueId;
            const filtervaluename = req.body.filtervalue;
            const filter_id = req.body.filter_id;
            filtervalueModel.findById(filtervallueid).then(filtervalues=>{
                filtervalues.filtervalue = filtervaluename;
                filtervalues.filter_id = filter_id;
                filtervalues.updatedBy = req.session.userdetails.userid;
                filtervalues.updatedOn = new Date()
                return filtervalues.save()
            }).then(result=>{
                successmessage = "Filter Value Updated Successfully";
                res.redirect('/filtervalueview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/filtervalueview');
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



//api

//api
module.exports.apiGetFilterValuesByCategoryId=(req,res,next)=>{
    const FilterId =  req.params.FilterId
    filtervalueModel
       .find({filter_id:FilterId,isDeleted:false})
       .exec(function(err,result){
            
        return res.send(
            result
            );
       })
}



