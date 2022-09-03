var express=require('express')
const router = express.Router()
const usercontroller = require('../controllers/UserController.js')
var bodyParser=require('body-parser');
router.use(express.json())
router.use(bodyParser.urlencoded({extended:true}));
router.use(bodyParser.json());




router.get("/dashboard",function(req,res){
   
    res.render('./admin/dashboard')
})
//var router=express();

router.get("/",function(req,res){
   
    res.render('./admin/login')
})
router.get("/login",function(req,res){
   
    res.render('./admin/login',{error:''})
})
router.post('/login',usercontroller.postLogin);


router.get('/register',function(req,res){
    res.render('./admin/register',{error:''})
});

router.post('/register',usercontroller.userregister);
 

router.get('/allregister',usercontroller.getuserdetails);
 

module.exports= router 