const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {



const query = req.body.CityName;
const appkey = "e4fa462786e16159e880a737638a5b9f";
const unit = "matric";
const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + appkey + "&units=" + unit;


 
        https.get(url, function(response) {
            console.log(response.statusCode); 


            response.on("data", function(data) {
                var weatherdata = JSON.parse(data);
                var temp = weatherdata.main.temp;
                var description = weatherdata.weather[0].description;
                var icon = weatherdata.weather[0].icon;
                var imgurl = "https://openweathermap.org/img/wn/" + icon + "@2x.png"
                res.write("<p>The weather is currently " + description + "</p>");
                res.write("<h1>The temperature of  " +query+ "  is " + temp + "</h1>");
                res.write("<img src=" + imgurl + ">");
                res.send();

            });

        });
    });



app.listen(3000, function() { console.log("server is running at port 3000") });