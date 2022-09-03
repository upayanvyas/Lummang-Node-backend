const categoryModel = require('../models/Category.Model');
const category = require('../models/Category.Model');

var assert=require('assert');


//create category
module.exports.postCreateCategory=(req,res) =>{
  console.log(req.body);  
const categories=new category();
categories.categoryname=req.body.categoryname;
categories.alias=req.body.alias;
categories.icon=req.file.filename;
categories.primary=req.body.primary;
categories.createdBy=(req.body.createdBy=req.session.userdetails.userid),
console.log(req.session.userdetails);
if(req.session.userdetails!=null|| req.session.userdetails != undefined)
{ 
     if(req.session.userdetails.usertype == 'admin'){
      categories.save(()=>{
          res.redirect('/allcategory') 
})
     }
     else{
       res.send('error')
     }
    }
     else{
        res.redirect('/login');
     }
}

//get allcategory

module.exports.getAllCategory=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){

    categoryModel.find({isDeleted:false},function(err,data){
     if(err) throw err;
     res.render('./category/allcategory',{data:data})
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
   



  //For edit the category 
  module.exports.getEditCategory=(req,res,next)=>{
  
    {
         if(req.session.userdetails.usertype == 'admin'){
            
              categoryModel.findById(req.params).then(category=>{
        
                categoryModel.find({isDeleted:false},function(err,categoryes){
                    console.log(category);
                    res.render('./category/editcategory',{
                        categorys: categoryes,
                        category:category,
                        
                    });
        });
             });
        }
        else{
            res.redirect('/login');
        }
    }
    
}

//For delete category
    module.exports.getDeleteCategory=(req,res,next)=>{
    
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                const categoryid =  req.params;
                categoryModel.findById(categoryid).then(category=>{
                    category.isDeleted = true;
                    category.deletedBy = (req.body.deletedBy=req.session.userdetails.userid);
                    category.deletedOn = new Date()
                    return category.save()
                }).then(result=>{
                    
                    res.redirect('/allcategory');
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


    //For update category
    module.exports.postUpdateCategory=(req,res,next)=>{
    
        if(req.session.userdetails!=null|| req.session.userdetails != undefined)
        {
             if(req.session.userdetails.usertype == 'admin'){
                const categoryid= req.params;
                const categoryname = req.body.categoryname;
                const alias = req.body.alias;
                const primary = req.body.primary;
                const Image = req.file;
                var icon ;
                categoryModel.findByIdAndUpdate(categoryid).then(category=>{
                    if(Image==null){
                        icon = category.icon
                    }
                    else{
                        icon =  Image.filename
                    }
                    category.categoryname = categoryname;
                    category.alias = alias;
                    category.primary=primary;
                    category.updatedBy = req.session.userdetails.userid;
                    category.updatedOn = new Date()
                    category.icon = icon
                    return category.save()
                }).then(result=>{
                    successmessage = "Category Updated Successfully";
                    res.redirect('/allcategory');
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

    
//For primary

module.exports.getParentChildNodesWithPrimary=(req,res,next)=>{
    var resdata = [];
    resdata.push({
        "id" : "0",
        "parent" : "#",
        "text":"Primary",
        "icon" : null,
        "state" : null,
        "opened" : false,
        "disabled": false,
        "selected" : false,
        "li_attr" : null,
        "a_attr":null
    });
    categoryModel.find({isDeleted:false},function(err,data){
        if(err) throw err;
        for(var i=0;i<data.length;i++){
            if(data[i].primary == "0"){
                resdata.push({
                    "id" : data[i]._id.toString(),
                    "parent" : "#",
                    "text":data[i].categoryname,
                    "icon" : null,
                    "state" : null,
                    "opened" : false,
                    "disabled": false,
                    "selected" : false,
                    "li_attr" : null,
                    "a_attr":null
                });
            }
            else{
                resdata.push({
                    "id" : data[i]._id.toString(),
                    "parent" :data[i].primary.toString(),
                    "text":data[i].categoryname,
                    "icon" : null,
                    "state" : null,
                    "opened" : false,
                    "disabled": false,
                    "selected" : false,
                    "li_attr" : null,
                    "a_attr":null
                });
            }
        }
        res.status(200).json(resdata);
    })
      
 
    


}
     
module.exports.getCategorybyprimary=(req,res,next)=>{
  
    
      const  primary=req.params.primary
              categoryModel.find({primary:primary,isDeleted:false}).then(category=>{
        
              
                   
                   return res.send({
                    category: category,
                        
                        
                    });
        });
           
       
        
   
}
