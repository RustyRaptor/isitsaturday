const express = require('express'),
  hbs = require('hbs'),
  fs = require('fs'),
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

// NOTE: The conditional logic on the colors and text etc. could probably be moved
// to the template itself.
function renderPage (res, saturday) {
  res.render('saturday.hbs', {
    pageTitle: 'Is it E?',
    welcomeMessage: 'let\'s find out',
    saturday: saturday ? 'E!' : 'e!',
    video: saturday ?
      'https://my.mixtape.moe/ymiizt.mp4' : 'https://my.mixtape.moe/ymiizt.mp4',
    preview: saturday ?
      'http://i.imgur.com/o9fmi5P.png' : 'http://i.imgur.com/o9fmi5P.png',
    color: saturday ? 'green' : 'red'
  })
}

const isItSaturday = () => {
  const calculateTimeAtOffset = (offset) => {
    var d = new Date()

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000)

    // create new Date object sing supplied offset
    return new Date(utc + (3600000 * offset))
  }
  
  // Saturday in />p/ is defined as Saturday in all timezones between
  // UTC-12 and UTC+14.
  return calculateTimeAtOffset(-12).getDay() === 6 ||
    calculateTimeAtOffset(14).getDay() === 6
}

app.get('/', (req, res) => {
  renderPage (res, isItSaturday())
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
})
