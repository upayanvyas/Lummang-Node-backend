var Request = require("request");
const AppSettings = require('../utils/AppSettings.json');
module.exports.postGetPincode =(req,res,next)=>{
    const lat = req.body.lat;
    const lang = req.body.lang;
    Request.get("https://maps.googleapis.com/maps/api/geocode/json?latlng="+lat+","+lang+"&key="+AppSettings.GoogleMapApiKey, (error, response, body) => {
    if(error) {
        return console.dir(error);
    }
    var postalcode =0;
    var city ="";
    for(var i=0;i<JSON.parse(body).results[0].address_components.length;i++ ){
        city = JSON.parse(body).results[0].address_components[1].long_name
        for(var j=0;j<JSON.parse(body).results[0].address_components[i].types.length;j++){
            if(JSON.parse(body).results[0].address_components[i].types[j]=="postal_code")
            {
                
                postalcode = JSON.parse(body).results[0].address_components[i].long_name;
            }
        }
       
    }
    res.status(200).json(
       {
            statusCode: 200,
            status:"success",
            data:{
                city : city,
                pincode : postalcode
            }

       }
    );
   
    });
}