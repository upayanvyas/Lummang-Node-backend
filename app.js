const express=require('express')
const app=express();
const cors = require('cors');
const session=require('express-session');
var mongoose=require('mongoose');
const bodyParser=require('body-parser');
app.use(express.json())
app.use(express.static('assets')); 
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

require('dotenv').config({ path: './.env' })



const port =process.env.PORT || 4000;

//const db="mongodb+srv://lummang123:lummang123@cluster0.9icav.mongodb.net/?retryWrites=true&w=majority"
//const db="mongodb+srv://Lummang1:Lummang1@cluster0.5dar1.mongodb.net/Lummang2?retryWrites=true&w=majority"

 
//const connectionparam={ 
  //useUnifiedTopology:true,useNewUrlParser:true,
 
  
   
//}

app.use(express.static('./assets/images'));
//var connection = mongoose.connection;
//connection.once('open',function(){
  //  console.log("success");
//});
const user = require('./routes/user');
const category = require('./routes/category');
const filter = require('./routes/filter');
const filtervalue = require('./routes/filtervalue');
const filtersetting = require('./routes/filtersetting')
const item = require('./routes/Item')
const order=require('./routes/order')
const inventory=require('./routes/inventory')
const deliveryparty=require('./routes/daliveryparty')
const toptwooffer=require('./routes/Toptwooffer')
const dealsoftheday=require('./routes/Dealoftheday')
const wishlist=require('./routes/wishlist')
const cms=require('./routes/cms');
const imageupload=require('./routes/imageupload');
const topcategories=require('./routes/topcategories')
const ourclient=require('./routes/ourclient');
const newarrivals=require('./routes/newarrivals');
const secondtwooffer=require('./routes/secondtwooffer')
const newarrivalsitem=require('./routes/newarrivalsitem')
const bestseller=require('./routes/bestseller')
const mostpopularitem=require('./routes/mostpopularitem')
const featured=require('./routes/feaured')
const trendingproduct=require('./routes/trendingproduct')
const trendingproduct2=require('./routes/trendingproduct2')
const topbestseller=require('./routes/topbestseller')
const hotdeals=require('./routes/Hotdeals')
const promotionbanner=require('./routes/promotionbanner')
const cart=require('./routes/cart')
const customers=require('./routes/Customers')
const useraddress=require('./routes/useraddress')
const sms=require('./routes/sms')
const itemimages=require('./routes/imageupload')
const razorpay=require('./routes/razorpay')
app.set('view engine','ejs');
app.use(cors());

app.use( 
    session( 
            {
                resave: true ,
                secret: '123456' ,  
                saveUninitialized: true, 
              
            }   
        )
    );
//app.use("/",routes)
app.use(secondtwooffer)
app.use(user);
app.use(category);
app.use(filter);
app.use(dealsoftheday);
app.use(filtervalue);
app.use(filtersetting);
app.use(item)
app.use(order);
app.use(inventory);
app.use(deliveryparty)
app.use(toptwooffer);
app.use(wishlist);
app.use(cms);
app.use(imageupload);
app.use(topcategories);
app.use(ourclient);
app.use(newarrivals);
app.use(newarrivalsitem);
app.use(bestseller);
app.use(mostpopularitem);
app.use(featured); 
app.use(trendingproduct)
app.use(trendingproduct2)
app.use(topbestseller)
app.use(hotdeals)
app.use(promotionbanner)
app.use(cart)
app.use(customers)
app.use(useraddress)
app.use(sms)
app.use(razorpay)
app.use(itemimages)
   



  
mongoose.connect('mongodb+srv://lummang123:lummang123@cluster0.9icav.mongodb.net/Lummang3?retryWrites=true&w=majority')
        .then(result=>{
            app.listen(port);    
            console.log(`server started at port -> ${port}`)
        })
        .catch(err=>{ 
            console.log(err); 
}) 