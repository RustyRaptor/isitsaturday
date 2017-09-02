const express = require("express");
const request = require("request");
const hbs = require("hbs");
const fs = require("fs");
const date = require("date");
const port = process.env.PORT || 3000;
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

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", text => {
  return text.toUpperCase();
});

app.get("/", (req, res) => {
  request(
    {
      url:
        "http://api.timezonedb.com/v2/get-time-zone?key=IV72MJ6RFHL7&format=json&by=zone&zone=Pacific/Kiritimati",
      json: true
    },
    (error, response, body) => {
      if (error) {
        console.log("Unable to connect to timezonedb server.");
      } else if (response.statusCode === 400) {
        console.log("Unable to fetch timezone.");
      } else if (response.statusCode === 200) {
        var dateKiri = body.formatted;
        var dateKiriFormatted = new Date(dateKiri);
        var dayKiri = dateKiriFormatted.getDay();
        if (dayKiri === 6) {
          res.render("saturday.hbs", {
            pageTitle: "Is it saturday?",
            welcomeMessage: "let's find out",
            saturday: "YES!",
            video: "https://my.mixtape.moe/ymiizt.mp4",
            color: "green"
          // res.render("saturday.hbs", {
          //   pageTitle: "Is it saturday?",
          //   welcomeMessage: "let's find out",
          //   saturday: "NO!",
          //   video: "https://my.mixtape.moe/kqpane.mp4",
          //   color: "red"
          //   This is just for testing purposes DO NOT UNCOMMENT
          });
        } else {
          request(
            {
              url:
                "http://api.timezonedb.com/v2/get-time-zone?key=IV72MJ6RFHL7&format=json&by=zone&zone=Pacific/Midway",
              json: true
            },
            (error, response, body) => {
              if (error) {
                console.log("Unable to connect to timezonedb server.");
              } else if (response.statusCode === 400) {
                console.log("Unable to fetch timezone.");
              } else if (response.statusCode === 200) {
                var dateMidway = body.formatted;
                var dateMidwayFormatted = new Date(dateKiri);
                var dayMidway = dateKiriFormatted.getDay();
                if (dayMidway === 6) {
                  res.render("saturday.hbs", {
                    pageTitle: "Is it saturday?",
                    welcomeMessage: "let's find out",
                    saturday: "YES!",
                    video: "https://my.mixtape.moe/ymiizt.mp4",
                    color: "green"
                  });
                } else {
                  res.render("saturday.hbs", {
                    pageTitle: "Is it saturday?",
                    welcomeMessage: "let's find out",
                    saturday: "NO!",
                    video: "https://my.mixtape.moe/kqpane.mp4",
                    color: "red"
                  });
                }
              }
            }
          );
        }
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
