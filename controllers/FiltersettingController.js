const filtersettingModel = require('../models/Filtersetting.Model');
const filterModel = require('../models/Filter.Model');
const  filtervalueModel = require('../models/Filtervalue.Model');
const CategoryModel=require('../models/Category.Model');
var mongoose=require('mongoose');



//get filter and category for filter setting
module.exports.getFilterforfiltersetting=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' ){
         
            CategoryModel.find({isDeleted:false},function(err,categories){
                
            filterModel.find({isDeleted:false},function(err,filter){
            res.render('filter/createfiltersetting',{
                filters:filter,
                categories:categories,
                
            });
           
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


//filter setting create

function isArrayMdnOfficial(objToCheck) {
    return Object.prototype.toString.call(objToCheck) === '[object Array]';
}

module.exports.postFiltersettingCreate=(req,res,next)=>{

    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        console.log(req.body.filtervalues);
         if(req.session.userdetails.usertype == 'admin' ){
             let filterva =[];
         
            if(isArrayMdnOfficial(req.body.filtervalues) )
            {
                filterva = req.body.filtervalues.map(s => mongoose.Types.ObjectId(s));
            }
            else{
                filterva = req.body.filtervalues;
            }
            if(isArrayMdnOfficial(req.body.category_id) )
            {
                    for(var i=0;i<req.body.category_id.length;i++)
                    {
                        const FilterSetting = filtersettingModel({
                            category_id: req.body.category_id[i],
                            filter_id: req.body.filter_id,
                            FilterValues:filterva
                        });
                        FilterSetting 
                        .save().then(result=>{
                            successmessage = 'Success';
                        
                        })
                        .catch(err=>{
                            errormessage = err;
                            
                        })
                    }
            }
            else{
                const FilterSetting = filtersettingModel({
                    category_id: req.body.category_id,
                    filter_id: req.body.filter_id,
                    FilterValues:filterva
                });
                FilterSetting 
                .save().then(result=>{
                    successmessage = 'Success';
                
                }) 
                .catch(err=>{
                    errormessage = err;
                    
                })
            }
            res.redirect('/createfiltersetting');
        }
        else{
        res.redirect('/login');
        }
    }
    else{
    res.redirect('/login');
    }
}




module.exports.GetFilterAndFilterValuesView = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            filtersettingModel.find({isDeleted:false}).populate('filter_id').populate('category_id').populate('FilterValues').exec(function(err,filtersettings
                ){
                res.render('filter/filtersettingview',{
                    filtersettings: filtersettings,
                    

                   
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


// filtersetting delete
module.exports.getDeleteFilterSettings=(req,res,next)=>{
    const filtersetting_id = req.params;
    console.log(filtersetting_id)
    filtersettingModel.findById(filtersetting_id).then(setting=>{
        setting.isDeleted = true;
        setting.deletedBy = req.session.userdetails.userid;
        setting.deletedOn = new Date()
        return setting.save()
    }).then(result=>{
        
        res.redirect('/FiltersettingView');
    })
    .catch(err=>
        { console.log(err)
            
            errormessage = err;
             res.redirect('/FiltersettingView');
        });

}


//get filtersettingid for edit

//exports.getEditFilterAndFilterValueSetting = (req,res,next)=>{
  //  const filtersettingsid = req.params.filtersettingsid;
    //filtersettingModel.findById(filtersettingsid).then(setting=>{
      //  CategoryModel.find({isDeleted:false},function(err,category){
        //        console.log(category);
          //      filterModel.find({isDeleted:false},function(err,filter){
            //    console.log(filter);
              //  filtervalueModel.find({isDeleted:false},function(err,filtervalue){
                //    console.log(setting);
        //res.render('filter/editfiltersetting',{
          //  filters:filter,
            //category:category,
            //filtervalue : filtervalue,
            
        //});
    //});
      //  });
    //});
//});   
  //  }



    module.exports.getEditFilterAndFilterValueSetting = (req,res,next)=>{
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                    const filtersettingsid = req.params;
                    filtersettingModel.findById(filtersettingsid).populate('filter_id').populate('category_id').populate('FilterValues').then(filtersettings=>{
                        CategoryModel.find({isDeleted:false},function(err,category){
                            filterModel.find({isDeleted:false},function(err,filter){
                            res.render('filter/editfiltersetting',{
                                category:category,
                                filter:filter,
                                filtersettings:filtersettings
                            });
                        })
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
    
   //update filtersetting 
   module. exports.postUpdateFilterAndFilterValueSetting = (req,res,next)=>{
    
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
            console.log(req.body.filtervalues);
             if(req.session.userdetails.usertype == 'admin' ){
               
                const category_id = req.body.category_id;
                const filter_id = req.body.filter_id ;
                const filtersettingsid = req.params;
                const FilterValues=req.body.filtervalues;
                console.log(filtersettingsid);
                filtersettingModel.findById(filtersettingsid).then(setting=>{
                    setting.category_id = category_id;
                    setting.filter_id = filter_id;
                    setting.FilterValues = FilterValues;
                    return setting.save()
                }).then(result=>{
                    successmessage = "Filter Settings Updated Successfully";
                    res.redirect('/FiltersettingView');
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

//api
    module.exports.apiGetFilterAndFilterValuesByCategoryId=(req,res,next)=>{
        const ObjectId = mongoose.Types.ObjectId;
        const CategoryId =  req.params.Categoryid
        filtersettingModel.find({category_id:CategoryId, isDeleted:false}).populate('filter_id')
                           
        .exec(function (err, result) {
           
           return res.send(
            result
            );
         
        });
    }

  //get filtervalue by filter and categoryid
    module.exports.getfiltervaluebyctegoryidandfilter=(req,res,next)=>{
        const ObjectId = mongoose.Types.ObjectId;
        const CategoryId =  req.params.Categoryid;
        const FilterId=req.params.Filterid
        filtersettingModel.find({category_id:CategoryId,filter_id:FilterId,isDeleted:false}).populate('FilterValues')
                           
        .exec(function (err, result) {
           
           return res.send(
            result
            );
         
        });
    }

//get item by categoryid
module.exports.apiGetfilterByCategory = (req,res,next)=>{
    const category_id=req.params.category_id 
    var agg = [ 
        
     
        {
            $match: { 
              category_id: mongoose.Types.ObjectId(category_id),
            //    category_id:  category_id,
                
               isDeleted: false,  
            }
            
        }, 
    



  // Deconstructs the array field from the
  // input document to output a document
  // for each element
    
      
  {
    $group:{
        "_id":"$filter_id",
        filter:{
        $push:{
           "filter":"$FilterValues",

        }
    } 
    }  
}
  ,  
   
  {
    $lookup: {

           
      from: "filters", // collection name in db
     localField:"_id",
     foreignField:"_id",


     
       
        as: "filters"
    },
    
       
},



{
    $lookup: { 
      from: "filtervalues",
      localField:"filter.filter",
         
      foreignField: "_id",

      as: "FilterValues",
    },
  },
 


         
  
    ] 
    
    filtersettingModel.aggregate(agg).exec(function(err, filters) {
        
    return res.json (filters); 
  
})
   
} 
 
 
module.exports.getfilterdetailsbycategoryid=(req,res,next)=>{
    const category_id=req.params.category_id 


    filtersettingModel.find({category_id:category_id}).distinct("filter_id").then(filter=>{
            
        res.send({
            filter: filter
        });

    })

}








module.exports.apiGetfiltervalueByCategory = (req,res,next)=>{
    const category_id=req.params.category_id 
    var agg = [ 
        
       
        {
            $lookup: {

                   
              from: "filtervalues", // collection name in db
             
                let: {m_id: "$FilterValues" },

                pipeline: [  
                   
                    { $match:
                       { $expr:
                          { $and:  
                             [  

                               { $eq: [ "$isDeleted",  false] },
                               { $eq: [ "$_id",  "$$m_id"] },
                              
                               
                             ]
                          }, 
                       }
                    },
                
                    
                   
                  
                
                   
                 ], 
                as: "filtervalues"
            },
          
        },
      
        {
            $match: { 
              category_id: mongoose.Types.ObjectId(category_id),
            //    category_id:  category_id,
                
               isDeleted: false,  
            }
        }, 

    ] 
    
    filtersettingModel.aggregate(agg).exec(function(err, filters) {
        const response = {
            StatusCode : 200,
            Status :  'success', 
           
                filters : filters,
               
            
        };
        res.send(response);
 
})
   
} 





