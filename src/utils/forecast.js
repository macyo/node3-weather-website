const request = require('request')


const forecast = (lat, long, callback) => {

const url = 'https://api.darksky.net/forecast/9e00eba07833e3b6718b159ce2153ca9/'+lat+','+long+'?units=si'

function Unix_timestamp(t)
{
var dt = new Date(t*1000);
var hr = dt.getHours();
var m = "0" + dt.getMinutes();
var s = "0" + dt.getSeconds();
return hr+ ':' + m.substr(-2) + ':' + s.substr(-2);  
}

request({ url, json: true}, (error, {body} ) => {

    if (error){

    callback('Unable to connect to weather service...',undefined)

    } else if(body.error) {
    callback('Unable to find location',undefined)

    }
    
    else {
        const temp = body.currently.temperature
        const chance = body.currently.precipProbability
        const place = body.timezone
        

        callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees, with a ' + chance + '% chance of rain. The high today is ' + body.daily.data[0].temperatureHigh + 'C, with a low of ' + body.daily.data[0].temperatureLow+'C.')
        

    
    }
})
}
module.exports = forecast

