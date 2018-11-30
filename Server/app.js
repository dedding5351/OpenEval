const express = require('express');
const app = express();

const classRoutes = require('./api/routes/classes');
const questionRoutes = require('./api/routes/question');
const surveyRoutes = require('./api/routes/surveys');
const responseRoutes = require('./api/routes/responses');
const registeredCourseRoutes = require('./api/routes/registeredCourses');
const studentRegisteredCourseRoutes = require('./api/routes/studentRegCourses');
const authenticateRoutes = require('./api/routes/Authenticate');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//process.env.MONGO_ATLAS_PW
mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);

// Setting up some middleware
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//preventing CORS errors
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if (request.method === 'OPTIONS') {
        response.header('Access-Control-Allow-Methods',
            'PUT, POST, PATCH, DELETE, GET');
        return response.status(200).json({});
    }
    next();
});

app.use('/classes', classRoutes);
app.use('/questions', questionRoutes);
app.use('/surveys', surveyRoutes);
app.use('/responses', responseRoutes);
app.use('/registeredCourses', registeredCourseRoutes);
app.use('/studentRegCourses', studentRegisteredCourseRoutes);
app.use('/authenticate', authenticateRoutes);

//handle errors
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

//Pipe in API routes HERE



/*app.use((request, response, next) => {
    response.json({
        message: 'Received a request successfully. Server has been deployed'
    })
})*/

module.exports = app;