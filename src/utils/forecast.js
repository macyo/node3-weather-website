const request = require('request')


const forecast = (lat, long, callback) => {

const url = 'https://api.darksky.net/forecast/9e00eba07833e3b6718b159ce2153ca9/'+lat+','+long+'?units=si'

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
        callback(undefined, body.daily.data[0].summary + ' It is currently ' + temp + ' degrees, with a ' + chance + '% chance of rain')
        

    
    }
})
}
module.exports = forecast

