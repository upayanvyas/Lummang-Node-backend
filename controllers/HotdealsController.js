const hotdealsModel = require('../models/Hotdeals.Model');
const ItemModel = require('../models/Item.Model');
var successmessage = null;
var errormessage = null;

//create newarrivals
module.exports.gethotdeal =(req,res,next)=>{
    console.log(req.session);
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){

            ItemModel.find({isDeleted:false},function(err,item){
                res.render('hotdeals/createhotdeals',{
                    item : item,
                    successmessage : successmessage, 
                    errormessage: errormessage
                });
                successmessage = null;
                errormessage=null;
            
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

//post create Dealsoftheday
module.exports.posthotdeal=(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            
           
            const itemid = req.body.itemid;
            const offertime=req.body.offertime;
            const deals = new hotdealsModel({
                
                itemid: itemid,
                offertime:offertime,
                createdby: req.session.userdetails.userid,
                createdon: new Date()
            });
            deals
            .save()
            .then(result=>{
                successmessage ='hotdeal created sucessfully';
                res.redirect('/createhotdeals');
            })
            .catch(err=>{ 
                errormessage = err;
                res.redirect('/createhotdeals');  
            })
        }
        else 
        {
            res.redirect('/login');
        }
    }
    else{
        res.redirect('/login');
    }
}
// view hotdeals
module.exports.getViewhotdeals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            hotdealsModel.find({isDeleted:false}).populate('itemid').exec(function(err,hotdeals){
                res.render('./hotdeals/viewhotdeals',{
                    hotdeals : hotdeals,
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

//get edit hotdeal

module.exports.getEdithotdeals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin' || req.session.userdetails.usertype == 'seller' ){        
            const hotdealsid = req.params._id;
            hotdealsModel.findById(hotdealsid).populate('itemid').then(hotdeals=>{
                ItemModel.find({isDeleted:false},function(err,item){
                    res.render('./hotdeals/edithotdeals',{
                        item: item,
                        hotdeals:hotdeals
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

//post update deals of the day

module.exports.postUpdatehotdeals = (req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
         if(req.session.userdetails.usertype == 'admin'){
            
             const hotdealsid = req.body._id;
            const itemid = req.body.itemid;
            const offertime=req.body.offertime;
            hotdealsModel.findById(hotdealsid ).then(hotdeals=>{
                hotdeals.itemid = itemid;
                hotdeals.offertime=offertime;
                hotdeals.updatedBy = req.session.userdetails.userid;
                hotdeals.updatedOn = new Date()
                return hotdeals.save()
            }).then(result=>{
                successmessage = "deals Updated Successfully";
                res.redirect('/gethotdealsview');
            })
            .catch(err=> {
                errormessage = err;
                res.redirect('/gethotdealsview');
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

//Delete dealsoftheday
module.exports.getDeletehotdeals =(req,res,next)=>{
    if(req.session.userdetails!=null|| req.session.userdetails != undefined)
    {
        if(req.session.userdetails.usertype == 'admin'){
            const hotdealsid = req.params._id;
            hotdealsModel.findById(hotdealsid).then(hotdeals=>{
               hotdeals.isDeleted = true;
               hotdeals.deletedBy = req.session.userdetails.userid;
               hotdeals.deletedOn = new Date()
                return hotdeals.save()
            })
            .then(result=>{
                successmessage = "deal Deleted Successfully";
                res.redirect('/gethotdealsview');
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

module.exports.gethotdeals = (req,res,next)=>{
    hotdealsModel.find({isDeleted:false}).populate('itemid').exec(function(err,hotdeals){
         const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                hotdeals : hotdeals
            }
        };
        res.status(200).json(response);
    })
}

module.exports.apiGetallhotdeals = (req,res,next)=>{
    
    var agg = [
        {
            $lookup: {
                from: "inventories", // collection name in db
                let: { mitemid: "$itemid" },
                pipeline: [
                    { $match:
                       { $expr:
                          { $and:
                             [
                                { $eq: [ "$isDeleted",  false] },
                               { $eq: [ "$itemid",  "$$mitemid"] },
                              
                             ]
                          },
                       }
                    },
                   
                   
                 ],
                as: "inventories"
            }
        },
        {
            $match: { 
                
                isDeleted: false,  
            }
        },
    ]

    hotdealsModel.aggregate(agg).then(hotdeals=> {
       hotdealsModel.find({isDeleted:false}).populate('itemid').exec(function(err,items) {
        const response = {
            StatusCode : 200,
            Status :  'success',
            data:{
                items : items,
                hotdeals:hotdeals
            }
        }; 
        res.send(response);
   
    })
 })

}