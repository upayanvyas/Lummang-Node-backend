const InventoryModel = require('../models/Inventory.Model');

var successmessage = null;
var errormessage = null; 
module.exports.getAddNewItemToMyInventory=(req,res,next)=>{
    
          return  res.send({
                successmessage:successmessage,
                errormessage:errormessage
            });
            successmessage = null;
            errormessage = null;
         }
        

module.exports.getMyInventory=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){
           
                InventoryModel.find({isDeleted:false, vendor: req.session.userdetails.userid}).populate('itemid').exec(function(err,myitems){
                 console.log(myitems);
                res.render('inventory/myinventory',{
                    myitems: myitems,
                    successmessage :successmessage,
                    errormessage:errormessage
                });
                successmessage=null;
                errormessage = null;
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

module.exports.getDeleteItemFromInventory=(req,res,next)=>{
    
            const inventory_id = req.params.inventory_id;
            InventoryModel.findById(inventory_id).then(inventory=>{
                inventory.isDeleted = true;
               // inventory.deletedBy = req.session.userdetails.userid;
                inventory.deletedOn = new Date();
                return inventory.save()
            }).then(result=>{
                successmessage = "Item Deleted From Inventory Successfully";
                res.send(result);
            })
            .catch(err=> {
                errormessage =  err;
                res.send('error');
            });

        }
        


module.exports.postAddNewItemToMyInventory=(req,res,next)=>{
    
             const itemid = req.body.itemid;
             const mrp = req.body.mrp;
             const sellingprice = req.body.sellingprice;
             const vendor = req.session.userdetails.userid;
             var currentstock =  req.body.currentstock;
             const inventory = new InventoryModel({ 
                 vendor:vendor,
                 itemid:itemid,
                 mrp:mrp,
                 sellingprice:sellingprice,
                 currentstock : currentstock,
                 createdBy:vendor,
                 createdon: new Date()
             });
             inventory
             .save().then(result=>{
                successmessage = 'Success';
                console.log('Filter Created');
                res.redirect('/inventory/myinventory');
            })
            .catch(err=>{
                errormessage = err;
                console.log(err);
                res.redirect('/inventory/myinventory');
            });
           
        }
  


