const mongoose = require("mongoose");


const db="mongodb+srv://lummang123:lummang123@cluster0.9icav.mongodb.net/Lummang3?retryWrites=true&w=majority"

const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true ,
    useFindAndModify:false, 
}
mongoose.connect(db,connectionParams).then(()=>{
    console.log('connection sucessfull')
}).catch((err)=>{

    
    console.log('no connection');
})   