const userModel = require('../models/User.Model');
const user = require('../models/User.Model');
const otpGenerator= require('otp-generator');


//create new user

module.exports.userregister=(req,res) =>{
    console.log(req.body);
    
  const users=new userModel({
    usertype:'admin',
    email:req.body.email,
    Phoneno:req.body.Phoneno,
    password:req.body.password,
    confirmpassword:req.body.confirmpassword, 
    createdOn:new Date(),
  
  });
  users.save().then(result =>{  
    res.redirect('/login')
       

})
.catch(err=>{
    console.log(err);
})

    userModel.find({email:req.body.email})
    .then((resp) =>{
    if(resp.length !=0){
        res.render('./admin/register',{error:'email is alerdy exist !'})
    
        }  

if(req.body.username==''){
    res.render('./admin/register',{error:'plz enter username !'})
}
if(req.body.Phoneno==''){
    res.render('register',{error:'plz enter Phoneno !'})
}
if(req.body.email==''){
    res.render('register',{error:'plz enter email !'})
}
if(req.body.password==''){
    res.render('register',{error:'plz enter password !'})
}
if(req.body.confirmpassword==''){
    res.render('register',{error:'plz enter confirmpassword !'})
}


    if(req.body.password !==req.body.confirmpassword){
        res.render('register',{error:'password and conform password must be same !'})
    

    }

   
    else{
       
    
      
    
    }
})
} 


//for login user

module.exports.postLogin=(req,res,next)=>{
    console.log(req.body);
    const email = req.body.email;
    const password = req.body.password;

   
    userModel.find({email:email} && {password:password})
    .then((resp) =>{
    if(resp.length >0){
        req.session.userdetails ={
            userid: resp[0]._id,
            usertype:resp[0].usertype,
            username: resp[0].username,
            email:resp[0].email,
            Phoneno:resp[0].Phoneno,
            
      }
        res.redirect('/dashboard')
        console.log(req.session.userdetails)
    
}  
else{
    res.render('./admin/login',{error:'user does not exit !'})
    
}
    })
    }


    module.exports.getusernamee=(req,res,next)=>{

    const username= req.session.userdetails.username;
    res.render('./admin/dashboard',{
         username:username
    });

    } 



    module.exports.getuserdetails=(req,res,next)=>{

        userModel.find({isDeleted:false},function(err,filters){   
            res.send({
                filters : filters,
               
            });
 
        })
    }
 
    
    
                    