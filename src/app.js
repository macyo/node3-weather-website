const path = require ('path')
const express = require('express')
const hbs = require('hbs')
const app = express()

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

//Define paths for Express config


const publicDirectory = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// Set up handlebars engine and views location

app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// set up static directory to serve
app.use(express.static(publicDirectory))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather App Homepage',
        name:'Marcus'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Page',
        name:'Marcus'
    })
})
app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help Page',
        name:'Marcus'
    })
})

app.get('/weather',(req,res)=> {
    if (!req.query.adress) {
        return res.send({
            error: 'You must provide an adress'
        })
    }

    geocode (req.query.adress, (error, {latitude, longitude, location} = {}) => {
        if (error){
            return res.send({ error })
    
        }
    

        forecast(latitude,longitude,(error,forecastData) => {
            if (error){
                return res.send({ error })
            }
            
            res.send({
                forecast: forecastData, 
                location, 
                adress: req.query.adress
            })
    
        
        }) 
    })

 
})

app.get('/products',(req,res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

app.get('/help/*',(req,res)=> {
    res.render('404',{
        title:'404 Page',
        name:'Marcus',
        errorTitle:'This help page is not found'
    })
})

app.get('*',(req,res)=> {
    res.render('404',{
        title:'404 Page',
        name:'Marcus',
        errorTitle:'This page is not found'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

