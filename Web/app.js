// express set up
var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
app.use(express.static('public'));

// routing for views
app.use('/', router);
// home page
router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});
// list of all courses
router.get('/all-classes', function(req, res) {
    res.sendFile(path + 'all-classes.html');
});
// refined search page of courses
router.get('/search', function(req, res) {
    res.sendFile(path + 'search.html');
});
// about the application
router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});
// login page
router.get('/login', function(req, res) {
    res.sendFile(path + 'login.html');
});
// active surveys page
router.get('/surveys', function(req, res) {
    res.sendFile(path + 'surveys.html');
});
// 404 page
app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// loading in data
var allClasses = require('./public/js/all-classes.js');
allClasses.getAllCourses('https://openeval-server.herokuapp.com/classes/' + '');
var index = require('./public/js/index.js');
// index.getRegisteredCourses('https://openeval-server.herokuapp.com/registeredCourses/abray3');
index.getRegisteredCourses('https://openeval-server.herokuapp.com/studentRegCourses/cperez3');
var surveys = require('./public/js/surveys.js');
surveys.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/abray3');

// start local server
app.listen(3000, function() {
    console.log('Live on port 3000');
});