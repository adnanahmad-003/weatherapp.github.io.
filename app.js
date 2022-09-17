const express = require("express");
const https = require("https");
const bodyParser= require("body-parser");
const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req, res){
res.sendFile(__dirname+"/index.html");
    
})
app.post("/",function(req,res){
    const query = req.body.city;
    console.log(query);
    const url ="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid=2f155294d457dcba339c82641b853f2b&units=metric";
    https.get(url, function(response){
       response.on("data",function(data){
        const weatherdata=JSON.parse(data);
        
         const temp=weatherdata.main.temp;
         console.log(temp);
         const description = weatherdata.weather[0].description
         const feel =weatherdata.main.feels_like
         const icon =weatherdata.weather[0].icon;
         res.write("feels like" + feel);
        res.write("the temperature in"+query+" is"+ temp);
        res.write("description" + description);
        
         res.send();
        
       })
    })
})




app.listen(PORT, function(){
    console.log("server is running");
})