const express = require('express');
const request = require('request');
const hbs = require('hbs');
const fs = require('fs');
const date = require("date");


const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;

  console.log(log);
  fs.appendFile('server.log', log + '\n');
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});



app.get('/', (req, res) => {
  request({
    url: 'http://api.timezonedb.com/v2/get-time-zone?key=IV72MJ6RFHL7&format=json&by=zone&zone=Pacific/Kiritimati',
    json: true
  }, (error, response, body) => {
    if (error) {
      console.log('Unable to connect to timezonedb server.');
    } else if (response.statusCode === 400) {
      console.log('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      console.log(body.formatted);
      var dateKiri = body.formatted
      var datefKiri = new Date(dateKiri);
      var dayKiri = datefKiri.getDay();
      console.log(dayKiri);
      if (dayKiri === 6) {
        res.render('isitsaturday.hbs', {
          pageTitle: 'Is it saturday?',
          welcomeMessage: 'let\'s find out',
          saturday: "YES!",
          color: "green"
        });

      } else {
        res.render('isitsaturday.hbs', {
          pageTitle: 'Is it saturday?',
          welcomeMessage: 'let\'s find out',
          saturday: "NO!",
          color: "red"
        });

      }
    }
  });

});


// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
