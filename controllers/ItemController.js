const categoryModel = require('../models/Category.Model');
const itemModel = require('../models/Item.Model');
const inventoryModel=require('../models/Inventory.Model')

const mongoose  = require('mongoose');

var successmessage = null;
var errormessage = null;
//get category
module.exports.getAllCategory=(req,res,next)=>{
    
    categoryModel.find({isDeleted:false},function(err,data){
     if(err) throw err;
     res.send({data:data})
    })
}
function isArrayMdnOfficial(objToCheck) {
    return Object.prototype.toString.call(objToCheck) === '[object Array]';
}
               
//Item View by superadmin
module.exports.getItemView = (req,res,next)=>{
    
            itemModel.find({isDeleted:false},function(err,items){
               return res.send({
                    items:items,
                    successmessage : successmessage,
                    errormessage:errormessage
                });  
                successmessage = null;
                errormessage = null;
            })
        }
       


       // exports.apiGetFilterAndFilterValuesByCategoryId=(req,res,next)=>{
         //   const ObjectId = mongoose.Types.ObjectId;
           // const CategoryId =  req.params.Categoryid
            //filtersettingModel.find({category_id:CategoryId, isDeleted:false}).populate('filter_id')
                               
            //.exec(function (err, result) {
               
              // return res.send(
                //result
                //);
             
            //});
        //}



//delete item by super admin
module.exports.getDeleteItem = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            const ItemId = req.params.ItemId;
            ItemModel.findById(ItemId).then(item=>{
                item.isDeleted = true;
                item.deletedBy = req.session.userdetails.userid;
                item.deletedOn = new Date()
                return item.save()
            }).then(result=>{
                successmessage = "Item Deleted Successfully";
                res.redirect('/item/itemview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/item/itemview');
            });
        }
        else{
            res.redirect('/admin/login');
        }
    }
    else{
        res.redirect('/admin/login');
    }
}

      //get item by id  
        module.exports.getEditItem = (req,res,next)=>{
            const ItemId = req.params.ItemId;
            itemModel.findById(ItemId).then(item=>{
            categoryModel.find({isDeleted:false},function(err,category){
                            res.send({
                                item:item,
                                categorys:category
                            })
                        })
                     })
        
                }



      //get item by id           
   //    module.exports.getitembyid = (req,res,next)=>{
           
     //     const ItemId = req.params.ItemId;
       //     itemModel.findById(ItemId).then(item=>{
         //  categoryModel.find({isDeleted:false}) .exec(function(err,result){
           //     return res.send(
                   
             //       );
             
               // });
            //});
        
            //}

        
    
         
               module.exports.getItemBulkUpload=(req,res,next)=>{
                    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
                    {
                         if(req.session.userdetails.usertype == 'admin'){
                             res.render('item/bulkupload')
                        }
                        else{
                            res.redirect('/admin/login');
                        }
                    }
                    else{
                    res.redirect('/admin/login');
                    }
                
                }
                let  csvnerror          
let  csvnerrormessage   
let  csvprimary         
let  csvsku             
let  csvitemname        
let  csvcategoryText    
let  csvhsncode         
let  csvrateofgst       
let  csvshortdescription
let  csvlongdescription 
let  csvspecification   
let  csvheight          
let  csvwidth           
let  csvlength          
let  csvweight          
let  csvkeywords        
let  csvmetatags        
let  csvmetadescription 
let  csvimages          
let  csvyoutubevideourl 
let  csvfilters         
let  csvmrp             
let  csvourprice        
let  csvstock           
let  csvimagearr        
let  csvfiltervaluearr  
let csvcategoryId
let csvdeleveryTerm           
let csvuserid;
async function Upload(){

    for(var j=0;j<csvimages.split(',').length;j++)
    {
        csvimagearr.push(
                  {
                      filename : csvimages.split(',')[j],
                      path : "images\\" + csvimages.split(',')[j]
                  }  
          )
    }
    for(var k=0;k<csvfilters.split(',').length;k++)
    {
     await FilterValueModel.find({isDeleted:false,filtervalue:csvfilters.split(',')[k]},function(err,filter){
           if(filter.length>0)
           {
               csvfiltervaluearr.push(filter[0]._id)
           }
           else{
               csvnerror =false;
               csvnerrormessage = csvnerrormessage+  "filter values mismatech "; 
           }
       })
    }
    await categoryModel.find({isDeleted:false,categoryName: csvcategoryText},function(err,catey){
      //console.log(catey.length)
          if(catey.length>0)
          {
              csvcategoryId = catey[0]._id;
          }
          else{
              csvnerror = true;
              csvnerrormessage = csvnerrormessage + "categoryname mismatech "; 
          }
     });
  
    const item = new itemModel({
      primary: csvprimary,
      sku:csvsku,
      itemname: csvitemname,
      categoryid: csvcategoryId,
      hsncode: csvhsncode,
      rateofgst: csvrateofgst,
      height: csvheight,
      width: csvwidth,
      length: csvlength,
      weight: csvweight,
      shortdescription: csvshortdescription,
      longdescription: csvlongdescription,
      specification: csvspecification,
      videourl: csvyoutubevideourl,
      itemImages: csvimagearr,
      filters: csvfiltervaluearr,
      keywords: csvkeywords,
      metatags: csvmetatags,
      metadescription: csvmetadescription,
      QCStatus: csvnerror,
      QCFailedReason: csvnerrormessage,
      createdBy : csvuserid,
      deleveryTerm : csvdeleveryTerm,
      createdOn : new Date()
  });
  item
  .save().then(async result=>{
      successmessage = 'Success';
      const inventory = new InventoryModel({
          vendor: csvuserid,
          itemid:result._id,
          mrp:csvmrp,
          sellingprice:csvourprice,
          currentstock : csvstock,
          createdBy: csvuserid,
          createdon: new Date()
      });
          inventory
      .save().then(result=>{
          successmessage = 'Success';
            return true;         
         // res.redirect('/item/itemcreate');
      })
      .catch(err=>{
          errormessage = err;
          console.log(err);
          return false;
          //res.redirect('/item/itemcreate');
      });
     
     
  })
  .catch(err=>{
      errormessage = err;
      console.log(err);
      return false;
      //res.redirect('/item/itemcreate');
  })
 
}

module.exports.PostItemBulkUpload=async (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
    const csvFilePath= req.file.path;
    console.log(csvFilePath);
    csv()
.fromFile(csvFilePath)
.then( async (jsonObj)=>{   
    for(var i=0;i<jsonObj.length;i++)
    {
        
        
          csvuserid = req.session.userdetails.userid;
          csvnerror          = true;
          csvnerrormessage   = "";
          csvprimary         =jsonObj[i].PrimaryItemName;
          csvsku             =jsonObj[i].SKU;
          csvitemname        = jsonObj[i].ITEMNAME;
          csvcategoryText    = jsonObj[i].CATEGORY;   
          csvhsncode         = jsonObj[i].HSNCODE;
          csvrateofgst       = jsonObj[i].RATEOFGST;
          csvshortdescription = jsonObj[i].SHORTDESCRIPTION;
          csvlongdescription = jsonObj[i].LONGDESCRIPTION;
          csvspecification   = jsonObj[i].SPECIFICATION;
          csvheight          = jsonObj[i].HEIGHT;
          csvwidth           = jsonObj[i].WIDTH;
          csvlength          = jsonObj[i].LENGTH;
          csvweight          = jsonObj[i].WEIGHT;
          csvkeywords        = jsonObj[i].KEYWORDS;
          csvmetatags        = jsonObj[i].METATAGS;
          csvmetadescription = jsonObj[i].METADESCRIPTION;
          csvimages          = jsonObj[i].IMAGES;
          csvyoutubevideourl = jsonObj[i].YOUTUBEVIDEOURL;
          csvfilters         = jsonObj[i].FILTERS;
          csvmrp             = jsonObj[i].MRP;
          csvourprice        = jsonObj[i].OURPRICE;
          csvstock           = jsonObj[i].STOCK;
          csvdeleveryTerm = jsonObj[i].deleveryTerm;
          csvimagearr = null;
          csvfiltervaluearr = null;
          csvimagearr         = [];
          csvfiltervaluearr  = [];
          csvcategoryId         = "";
        
            await Upload();
         
      }
      res.redirect('/item/itemview')

})

}
else{
    res.redirect('/admin/login');
}
}
else{
res.redirect('/admin/login');
}
}




//api api api api api api api api


//create item
module.exports.postItemCreate =(req,res,next)=>{
    
    let categoryid = [];
    if(isArrayMdnOfficial(req.body.categoryid) )
    {
       categoryid = req.body.categoryid.map(s => mongoose.Types.ObjectId(s));
    }
    else{
       categoryid = req.body.categoryid;
    }
   const primary = req.body.primay; 
   const itemname = req.body.itemname;
   const shortdescription = req.body.shortdescription;
   const longdescription = req.body.longdescription;
   const specification = req.body.specification;
   const filter_id = req.body.filter_id;
   const FilterValues=req.body.FilterValues;
   const imageurl = req.files;
   const height = req.body.height;
   const width = req.body.width;
   const length = req.body.length;
   const weight = req.body.weight;
   const hsncode = req.body.hsncode;
   const rateofgst =  req.body.rateofgst;
   const keywords = req.body.keywords;
   const metatags = req.body.metatags;
   const metadescription = req.body.metadescription;
   const sku = req.body.sku;
   const  createdBy=req.body.createdBy;
   const mrp = req.body.mrp;
   const sellingprice = req.body.sellingprice;
   const currentstock = req.body.currentstock;
   const deliveryTerm = req.body.deleveryTerm;
   console.log(imageurl);
   const newitem = new itemModel({
       primary: primary,
       itemname:itemname,
       categoryid:categoryid,
       shortdescription:shortdescription,
       longdescription:longdescription,
       specification:specification,
       itemImages:imageurl,
       filter_id:filter_id,
       FilterValues:FilterValues,
       createdBy:createdBy,
       createdOn: new Date(),
       height: height,
       width: width,
       length: length,
       weight:weight,
       hsncode:hsncode,
       rateofgst:rateofgst,
       keywords:keywords,
       metatags:metatags,
       metadescription:metadescription,
       
       sku:sku,
       deleveryTerm :  deliveryTerm
   });
   newitem 
   .save().then(result=>{
       console.log(result)
       successmessage = 'Success';
       const inventory = new inventoryModel({
           vendor: req.body.vendor,
           itemid:result._id,
           mrp:mrp,
           sellingprice:sellingprice,
           currentstock : currentstock,
           createdBy:createdBy,
           createdon: new Date()
       });
       inventory
       .save().then(result=>{
           successmessage = 'Success';
           console.log('Filter Created');
           res.send(result);
       })
       .catch(err=>{
           errormessage = err;
           console.log(err);
           res.send('itemcreate');
       });
      
      
   })
   .catch(err=>{
       errormessage = err;
       console.log(err);
       res.send('item create');
   })
   
}
 

//item name search

module. exports.apiGetitemSearchFrontEnd= (req,res,next)=>{

    var agg = [
        {
            $lookup: {
                from: "inventories", // collection name in db
                let: { mitemid: "$_id" },
                pipeline: [
                    { $match:
                       { $expr: 
                          { $and:
                             [
                               { $eq: [ "$isDeleted",  false] },
                               { $eq: [ "$itemid",  "$$mitemid"] },
                               { $gte: [ "$currentstock",  1] },
                               
                             ]
                          },
                       }
                    },
                    {
                        $sort:{sellingprice : 1}
                    },
                   
                 ],
                as: "inventories"
            }
        },
        
        {
            $match: { 
                $or:[{productdetails: {$regex : req.params.itemname, $options : 'i'}},
               {itemname: {$regex : req.params.itemname, $options : 'i'},
                    
            }]
               
                
                   
            }
        }
                
            
          
       
       
        
    ]

    itemModel.aggregate(agg).exec(function(err, items) {
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                items : items
            }
        };
        res.send(response);
    })
   
    
}

module.exports.apiGetitemSearch= (req,res,next)=>{
    var regex = new RegExp(req.params.itemname, 'i');
  //  var query = ItemModel.find({itemname: regex}, { 'itemname': 1 }).limit(20);
    itemModel.find({'itemname':regex , isDeleted:false,primary:"0"},function(err,items){
        const response = {
            StatusCode : 200,
            Status : 'success',
            data:{
                items : items
            }
        }
        res.send(response);
    })
}

//get item by itemid
module.exports.apiGetItemByItemId = (req,res,next)=>{
    const itemId = req.params._id;
    var agg = [
        {
            $lookup: {
                from: "inventories", // collection name in db
                let: { mitemid: "$_id" },
                pipeline: [
                    { $match:
                       { $expr: 
                          { $and:
                             [
                               { $eq: [ "$isDeleted",  false] },
                               { $eq: [ "$itemid",  "$$mitemid"] },
                               
                               { $gte: [ "$currentstock",  1] },
                               
                             ]
                          },
                       }
                    },
                    {
                        $sort:{sellingprice : 1}
                    },
                   
                 ],
                as: "inventories"
            }
        },
        {
            $match: { 
                _id: mongoose.Types.ObjectId( itemId),
                isDeleted: false,  
            }
        },
    ]

    itemModel.aggregate(agg).exec(function(err, items) {
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                items : items
            } 
        };
        res.send(response);
    })
   
}



//get item by categoryid
module. exports.apiGetItemByCategoryId = (req,res,next)=>{
    const categoryid = req.params.categoryid;
   
        var agg = ([
            {
                $addFields:{
                    FilterValues:{
                        $map:{
                            input:"$FilterValues",
                            in:{
                                $toObjectId:"$$this"
                            }
                        }
                    }

                }
                
              
            },
          


           
            {
                $lookup: {
            
                       
                  from: "filtervalues", // collection name in db
                 localField:"FilterValues",
                 foreignField:"_id",
            
             
                 
                   
                    as: "FilterValues"
                },
            }, 
            {
                $lookup: {
            
                       
                    from: "filters", // collection name in db
                   localField:"FilterValues.filter_id",
                   foreignField:"_id",
              
               
                   
                     
                      as: "Filters"
                  },  
            },
            {
                $match: { 
                    categoryid: mongoose.Types.ObjectId(categoryid),
                    isDeleted: false,  
                }
            }, 
           
        
     
    ])

    itemModel.aggregate(agg).exec(function(err, items) {
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                items : items
            }
        };
        res.send(response);
    })
   
}
//get item by userid
module.exports.apiGetitemByuseid= (req,res,next)=>{
    const createdBy = req.params.createdBy;
    itemModel.find({createdBy,isDeleted:false}).then(items =>{
        const response = {
            StatusCode : 200,
            Status : 'success',
            data:{ 
                items : items
            } 
        }
        res.send(response);
    })
}


//delete item

module.exports.getapiDeleteItem = (req,res,next)=>{
    
            const ItemId = req.params.ItemId;
            const deletedBy = req.params.deletedBy
            itemModel.findById(ItemId).then(item=>{
                item.isDeleted = true;
                item.deletedBy = deletedBy;
                item.deletedOn = new Date()
                return item.save()
            })
        
       
}

//update item

module.exports.edititem=(req,res,next)=>{ 


       
           
               let categoryid = [];
               if(isArrayMdnOfficial(req.body.categoryid) )
               {
                  categoryid = req.body.categoryid.map(s => mongoose.Types.ObjectId(s));
               }
               else{
                  categoryid = req.body.categoryid;
               }
              const primary = req.body.primay;
              const itemname = req.body.itemname;
              const shortdescription = req.body.shortdescription;
              const longdescription = req.body.longdescription;
              const specification = req.body.specification;
              const filter_id = req.body.filter_id;
              const FilterValues=req.body.FilterValues;
              const imageurl = req.files;
              const height = req.body.height;
              const width = req.body.width; 
              const length = req.body.length;
              const weight = req.body.weight;
              const hsncode = req.body.hsncode;
              const rateofgst =  req.body.rateofgst;
              const keywords = req.body.keywords;
              const metatags = req.body.metatags;
              const metadescription = req.body.metadescription;
              const sku = req.body.sku;
              const mrp = req.body.mrp;
              const sellingprice = req.body.sellingprice;
              const currentstock = req.body.currentstock;
              const deliveryTerm = req.body.deleveryTerm;
              const  createdBy=req.body.createdBy;
             
              console.log(imageurl);
             const vendor=req.body.vendor;
                const updatedBy =  req.body.updatedBy;
                const updatedOn = new Date();
                const ItemId = req.params.ItemId;
                itemModel.findById(ItemId).then(item=>{
                    item.primary = primary;
                    item.itemname = itemname;
                    item.shortdescription = shortdescription;
                    item.longdescription = longdescription;
                    item.specification=specification;
                    item.filter_id=filter_id;
                    item.FilterValues=FilterValues;
                    item.imageurl=imageurl;
                    item.height=height;
                    item.width=width;
                    item.length=length; 
                    item.weight =weight ;
                    item.hsncode=hsncode;
                    item.rateofgst=rateofgst;
                    item.keywords=keywords;
                    item.metatags=metatags;
                    item.metadescription=metadescription;
                    item.sku=sku;
                    item.deleveryTerm =deliveryTerm;
                    item.updatedBy =updatedBy ;
                    item.updatedOn=updatedOn;
                    item.save()
                    return res.send (item)
                }).then(result=>{
                    successmessage= "Filter Updated Successfully"; 

                    
                   inventoryModel.findOne({ItemId}).then(inventory=>{
                    inventory.vendor=vendor,
                    inventory.itemid=req.body.itemid,
                    inventory.mrp=mrp,
                    inventory.sellingprice=sellingprice,
                    inventory.currentstock = currentstock,
                
                    inventory.updatedBy =updatedBy ;
                    inventory.updatedOn=updatedOn;
                    
                    inventory.save()  
                   return res.send(inventory)
                   
                })
                
                    
                })
            
        }

            
        
    module.exports.geteditinventory=(req,res,next)=>{ 


    const inventoryid=req.params._id;
    const ItemId = req.params.ItemId;
    const mrp = req.body.mrp;
    const sellingprice = req.body.sellingprice;
    const currentstock = req.body.currentstock;
    const deliveryTerm = req.body.deleveryTerm;
    const vendor=req.body.vendor;
    const updatedBy =  req.body.updatedBy;
                const updatedOn = new Date();
   inventoryModel.findOne({ItemId}).then(inventory=>{
    inventory.vendor=vendor,
    inventory.itemid=req.body.itemid,
    inventory.mrp=mrp,
    inventory.sellingprice=sellingprice,
    inventory.currentstock = currentstock,

    inventory.updatedBy =updatedBy ;
    inventory.updatedOn=updatedOn;
    
    inventory.save()  
   return res.send(inventory)
   
})

    }


    //get item by itemdetails



    module.exports.apiGetitemSearchbyitemdetailsFrontEnd= (req,res,next)=>{

        var agg = [
            
            {
                $match: { 
                    longdescription: {$regex : req.params.longdescription, $options : 'i'},
                    isDeleted: false,  
                }
            },
        ]
    
        itemModel.aggregate(agg).exec(function(err, items) {
            const response = {
                StatusCode : 200,
                Status :  'success',
                data:{
                    items : items
                }
            };
            res.send(response);
        })
       
        
    }


   
    module.exports.apiGetitemBycategory= (req,res,next)=>{
        const categoryid = req.params.categoryid;
        itemModel.find({categoryid,isDeleted:false}).then(items =>{
            const response = {
                StatusCode : 200,
                Status : 'success', 
                data:{ 
                    items : items
                } 
            }
            res.send(response);
        })
    }

    //item create 


    module.exports.postItemCreate =(req,res,next)=>{
    
        let categoryid = [];
        if(isArrayMdnOfficial(req.body.categoryid) )
        {
           categoryid = req.body.categoryid.map(s => mongoose.Types.ObjectId(s));
        }
        else{
           categoryid = req.body.categoryid;
        }
       
       const itemname = req.body.itemname;
       const shortdescription = req.body.shortdescription;
       const longdescription = req.body.longdescription;
       const specification = req.body.specification;
       const filter_id = req.body.filter_id;
       const FilterValues=req.body.FilterValues;
       const imageurl = req.files;
       const height = req.body.height;
       const width = req.body.width;
       const length = req.body.length;
       const weight = req.body.weight;
       const hsncode = req.body.hsncode;
       const rateofgst =  req.body.rateofgst;
       const keywords = req.body.keywords;
       const metatags = req.body.metatags;
       const metadescription = req.body.metadescription;
       const sku = req.body.sku;
       const  createdBy=req.body.createdBy;
       const mrp = req.body.mrp;
       const sellingprice = req.body.sellingprice;
       const currentstock = req.body.currentstock;
       const deliveryTerm = req.body.deleveryTerm;
       console.log(imageurl);
       const newitem = new itemModel({
           primary: primary,
           itemname:itemname,
           categoryid:categoryid,
           shortdescription:shortdescription,
           longdescription:longdescription,
           specification:specification,
           itemImages:imageurl,
           filter_id:filter_id,
           FilterValues:FilterValues,
           createdBy:createdBy,
           createdOn: new Date(),
           height: height,
           width: width,
           length: length,
           weight:weight,
           hsncode:hsncode,
           rateofgst:rateofgst,
           keywords:keywords,
           metatags:metatags,
           metadescription:metadescription,
           
           sku:sku,
           deleveryTerm :  deliveryTerm
       });
       newitem 
       .save().then(result=>{
           console.log(result)
           successmessage = 'Success';   
          
       })
       .catch(err=>{
           errormessage = err;
           console.log(err);
           res.send('item create');
       })
       
    }



    //productlisting


    module.exports.createproductlisting =(req,res,next)=>{
     
       const itemname = req.body.itemname;
       const FilterValues=req.body.FilterValues;
       const  imageurl = req.files; 
       const imageurl1 = req.files;
       const imageurl2 = req.files;
       const imageurl3 =req.files;

       const imageurl4 = req.files;
       const imageurl5 = req.files;
       const imageurl6 = req.files;
       const brandname=req.body.brandname;
        const categoryid =req.body.categoryid;
       const countryoforigin=req.body.countryoforigin;
       const hsncode = req.body.hsncode;
       const gst =  req.body.gst;
      const contentdetailofthisset=req.body.contentdetailofthisset;
       const productdetails = req.body.productdetails;
       const sku = req.body.sku;
       const  createdBy=req.body.createdBy;
       const mrp = req.body.mrp;
       const price = req.body.price;
      const  minimumquantityorder=req.body.minimumquantityorder;
       const listingminimumordequantity=req.body.listingminimumordequantity;
       const howmanypicesperset=req.body.howmanypicesperset;
       const noofcolourinthisset=req.body.noofcolourinthisset;
      const designcode=req.body.designcode;
       const freedelivery = req.body.freedelivery;
       const listigexpiredays=req.body.listigexpiredays;
      
       const newitem = new itemModel({
           
           itemname:itemname,
           categoryid:categoryid, 
           listigexpiredays:listigexpiredays,
           coverphoto:imageurl,
           productimage1:imageurl1,
           productimage2:imageurl2,
           productimage3:imageurl3,
           countryoforigin:countryoforigin,
          productimage4:imageurl4,
          productimage5:imageurl5,
          brandphoto:imageurl6,
          designcode:designcode,
          contentdetailofthisset:contentdetailofthisset,
           FilterValues:FilterValues.split(","),
           createdBy:createdBy,
           createdOn: new Date(),
           minimumquantityorder:minimumquantityorder,
           hsncode:hsncode,
           gst:gst,
           noofcolourinthisset:noofcolourinthisset,
           listingminimumordequantity:listingminimumordequantity,
           productdetails:productdetails,
           mrp: mrp,
           price:price,
           sku:sku,
           brandname:brandname,
          freedelivery :freedelivery,
          howmanypicesperset:howmanypicesperset
       });
       newitem 
       .save().then(result=>{
           console.log(result)
           successmessage = 'Success';   
          
       })
       .catch(err=>{
           errormessage = err;
           console.log(err);
           res.send(err);
       })
        
       
    }

    module.exports.apiitem = (req,res,next)=>{
       
            const itemId = req.params._id;
            var agg = ([
                {
                    $addFields:{
                        FilterValues:{
                            $map:{
                                input:"$FilterValues",
                                in:{
                                    $toObjectId:"$$this"
                                }
                            }
                        }

                    }
                    
                  
                },
              


               
                {
                    $lookup: {
                
                           
                      from: "filtervalues", // collection name in db
                     localField:"FilterValues",
                     foreignField:"_id",
                
                 
                     
                       
                        as: "FilterValues"
                    },
                }, 
                {
                    $lookup: {
                
                           
                        from: "filters", // collection name in db
                       localField:"FilterValues.filter_id",
                       foreignField:"_id",
                  
                   
                       
                         
                          as: "Filters"
                      },  
                },
                {
                    $match: { 
                        _id: mongoose.Types.ObjectId(itemId),
                        isDeleted: false,  
                    }
                },
               
            ])
        
            itemModel.aggregate(agg).exec(function(err, items) {
                const response = {
                    StatusCode : 200,
                    Status :  'success',
                    data:{
                        items : items
                    }  
                };
                res.send(response);
            })
           
        
    }        

      //get item by id  
      module.exports.getItem = (req,res,next)=>{
        const ItemId = req.params.ItemId;
        itemModel.findById(ItemId).then(item=>{
        
                        res.send({
                            item:item,
                           
                        })
                  
               
            
        })
    }

     