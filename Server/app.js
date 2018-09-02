const express = require('express')
const app = express()
const morgan = require('morgan')
const bodyParser = require('body-parser')

// Setting up some middleware
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())


//Allows connections from different IPs
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
        );
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods',
            'PUT, POST, PATH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

//Pipe in API routes HERE



/*app.use((request, response, next) => {
    response.json({
        message: 'Received a request successfully. Server has been deployed'
    })
})*/

module.exports = app