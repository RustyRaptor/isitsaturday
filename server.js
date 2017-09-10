const express = require('express'),
  request = require('request'),
  hbs = require('hbs'),
  fs = require('fs'),
  date = require('date'),
  port = process.env.PORT || 3000

var app = express()

hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs')

app.use((req, res, next) => {
  var now = new Date().toString()
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log)
  fs.appendFile('server.log', log + '\n')
  next()
})

app.use(express.static(__dirname + '/public'))

function showYes(res) {
  res.render('saturday.hbs', {
    pageTitle: 'Is it saturday?',
    welcomeMessage: "let's find out",
    saturday: 'YES!',
    video: 'https://my.mixtape.moe/ymiizt.mp4',
    preview: 'http://i.imgur.com/o9fmi5P.png',
    color: 'green'
  })
}

function showNo(res) {
  res.render('saturday.hbs', {
    pageTitle: 'Is it saturday?',
    welcomeMessage: "let's find out",
    saturday: 'NO!',
    video: 'https://my.mixtape.moe/kqpane.mp4',
    preview: 'http://i.imgur.com/DNMyePH.png',
    color: 'red'
  })
}

var checkTime = (loc) => {
  var targetDate = new Date()
  var timestamp =
    targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60
  var apikey = 'AIzaSyCLyhjhNaATDcLRjm6BRfEIVtZImQ6HGHM '
  var apicall =
    'https://maps.googleapis.com/maps/api/timezone/json?' +
    'location=' +
    loc +
    '&timestamp=' +
    timestamp +
    '&key=' +
    apikey
  var options = {
    url: apicall,
    json: true
  }

  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        reject('Unable to connect to timezonedb server.')
      } else if (response.statusCode === 400) {
        reject('Unable to fetch timezone.')
      } else if (response.statusCode === 200) {
        var offsets = body.dstOffset * 1000 + body.rawOffset * 1000

        var localdate = new Date(timestamp * 1000 + offsets)
        process.day = localdate.getDay()
      }

      resolve(process.day)
    })
  })
}

app.get('/', (req, res) => {
  const locations = [
    '28.2079353,-177.3728662'
  ]

  Promise.race(
    locations.map(checkTime)
  ).then((day) => {
    if (day === 6) {
      showYes(res)
    } else {
      showNo(res)
    }
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
