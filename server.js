const express = require("express"),
      request = require("request"),
      hbs = require("hbs"),
      fs = require("fs"),
      log = console.log,
      date = require("date"),
      port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");

app.use((req, res, next) => {
        var now = new Date().toString();
        var log = `${now}: ${req.method} ${req.url}`;
        console.log(log);
        fs.appendFile("server.log", log + "\n");
        next();
});

app.use(express.static(__dirname + "/public"));

var options = {
        url:"http://api.timezonedb.com/v2/get-time-zone?"
          + "key=IV72MJ6RFHL7&format=json&by=zone&zone=Pacific/Kiritimati",
        json: true
};

function showYes(res){
        var res = res;
        res.render("saturday.hbs", {
                pageTitle: "Is it saturday?",
                welcomeMessage: "let's find out",
                saturday: "YES!",
                video: "https://my.mixtape.moe/ymiizt.mp4",
                preview: "http://i.imgur.com/o9fmi5P.png",
                color: "green"
        });     
};

function showNo(res){
        var res = res;
        res.render("saturday.hbs", {
                pageTitle: "Is it saturday?",
                welcomeMessage: "let's find out",
                saturday: "NO!",
                video: "https://my.mixtape.moe/kqpane.mp4",
                preview: "http://i.imgur.com/DNMyePH.png",
                color: "red"
        });
};

var day = 7;
var checkTime = (place, callback) => {
        var loc        = place
            targetDate = new Date(),
            timestamp  = targetDate.getTime()/1000 
                         + targetDate.getTimezoneOffset() * 60,
            apikey     = 'AIzaSyCLyhjhNaATDcLRjm6BRfEIVtZImQ6HGHM ',
            apicall    = 'https://maps.googleapis.com/maps/api/timezone/json?'
                         + 'location=' + loc + '&timestamp=' + timestamp 
                         + '&key=' + apikey,
            options    = {
                url: apicall,
                json: true
        };
        request(options, (error, response, body) => {
                if (error){
                        console.log("Unable to connect to timezonedb server.");
                }
                else if (response.statusCode === 400){
                        console.log("Unable to fetch timezone.");
                }
                else if (response.statusCode === 200){
                        var offsets = body.dstOffset * 1000
                                    + body.rawOffset * 1000;

                        var localdate = new Date(timestamp * 1000 + offsets); 
                        process.day = localdate.getDay();
                };
        return callback(null, process.day);
        });
};

var showPage = (res) => {
        var loc1 = '28.2079353,-177.3728662';
        var loc2 = '28.2079353,-177.3728662';
        var saturday = checkTime(loc1, (err, day) => {
                if (err)
                        console.log(err);
                else 
                        console.log("it worked 2");
                });
        log(saturday);
        if (saturday === 6)
                showYes(res);
        else {
                saturday = checkTime(loc1, (err, day) => {
                if (err)
                        console.log(err);
                else 
                        log("it worked"); 
                });
                if (saturday === 6)
                        showYes(res);
                else{
                        showNo(res);
                }
        }
};
        

app.get("/", (req, res) => {
        showPage(res);
});

app.listen(port, () => {
        console.log(`Server is up on port ${port}`);
}
);