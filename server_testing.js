const express = require("express"),
      request = require("request"),
      hbs = require("hbs"),
      fs = require("fs"),
      log = console.log,
      date = require("date"),
      port = process.env.PORT || 3000;
// '35.731252, 139.730291'
'28.2072, 177.3735'
var checkTime = (place, callback) => {
        var loc        = place
            targetDate = new Date(), // Current date/time of user computer
            timestamp  = targetDate.getTime()/1000 + targetDate.getTimezoneOffset() * 60, // Current UTC date/time expressed as seconds since midnight, January 1, 1970 UTC
            apikey     = 'AIzaSyCLyhjhNaATDcLRjm6BRfEIVtZImQ6HGHM ',
            apicall    = 'https://maps.googleapis.com/maps/api/timezone/json?'
                         + 'location='+ loc + '&timestamp=' + timestamp + '&key=' + apikey,
            options    = {
                url: apicall,
                json: true
        };
        return request(options, (error, response, body) => {
                if (error){
                        console.log("Unable to connect to timezonedb server.");
                        return callback(error || {statusCode: response.statusCode});
                }
                else if (response.statusCode === 400){
                        console.log("Unable to fetch timezone.");
                        return callback(error || {statusCode: response.statusCode});
                }
                else if (response.statusCode === 200){
                        var offsets = body.dstOffset * 1000 + body.rawOffset * 1000; // get DST and time zone offsets in milliseconds
                        var localdate = new Date(timestamp * 1000 + offsets); // Date object containing current time of Tokyo (timestamp + dstOffset + rawOffset)
                        // console.log(localdate.getDay()); // Display current Tokyo date and time
                        var day = localdate.getDay();
                        callback(null, day);
                }
        });
};
log(checkTime('35.731252, 139.730291', (err, day) => {
        if (err)
                console.log(err);
        else
                log(day);
}));