// express set up
var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';
app.use(express.static('public'));

// routing for views
app.use('/', router);

user = {};

// used for making post requests
var request = require('request');

// used for retrieving input from forms
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// takes login info and retrieves appropriate data, based on usertype
app.post('/', function(req, res) {
    // record username and usertype for proper view setup
    user = {
        "username": req.body.username,
        "usertype": req.body.usertype
    }
    var index = require('./public/js/index.js');
    // load different index pages for professors and students
    // because they have different api routes
    if (user.usertype == "professor") {
        index.getRegisteredCourses('https://openeval-server.herokuapp.com/registeredCourses/' + user.username);
    } else if (user.usertype == "student") {
        index.getRegisteredCourses('https://openeval-server.herokuapp.com/studentRegCourses/' + user.username);
    }
    res.redirect('/');
});

// home page, shows currently registered courses of user
router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

// list of all courses that can be registered
router.get('/all-classes', function(req, res) {
    var allClasses = require('./public/js/all-classes.js');
    allClasses.getAllCourses('https://openeval-server.herokuapp.com/classes/');
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

// views the current active surveys for the course
// leads to different pages for professors and students
app.post('/view-surveys', function(req, res) {
    // take course number and professor name from form
    // replace spaces with %20 to work with url
    var courseNumber = req.body.courseNumber.split(' ')[0] + '%20' + req.body.courseNumber.split(' ')[1];
    var professor = req.body.courseNumber.split(' ')[2];
    // load different active survey pages for professors and students
    // professor page has the option to create new surveys and view survey results
    // student page can only respond to surveys
    if (user.usertype == "professor") {
        var activeSurveys = require('./public/js/active-surveys.js');
        activeSurveys.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/' + professor + '/' + courseNumber);
        res.redirect('/active-surveys');
    } else if (user.usertype == "student") {
        var activeSurveysStudent = require('./public/js/active-surveys-student.js');
        activeSurveysStudent.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/' + professor + '/' + courseNumber);
        res.redirect('/active-surveys-student');
    }
});

// active surveys page for professors
router.get('/active-surveys', function(req, res) {
    // var activeSurveys = require('./public/js/active-surveys.js');
    // activeSurveys.getActiveSurveys('https://openeval-server.herokuapp.com/surveys/' + user.username + '/' + 'CS 1332');
    res.sendFile(path + 'active-surveys.html');
});

// active surveys page for students
router.get('/active-surveys-student', function(req, res) {
    res.sendFile(path + '/active-surveys-student.html');
});

// creates a new survey
app.post('/new-survey', function(req, res) {
    var startTime = req.body.starttime;
    var endTime = req.body.endtime;
    var surveyName = req.body.surveyname;
    var courseName = req.body.coursename.replace(' ', '%20');
    var semester = req.body.semester;
    var professorID = req.body.professorID;
    // console.log(startTime, endTime, surveyName, courseName, semester, professorID);
    var formData = {
        startTime: startTime,
        endTime: endTime,
        name: surveyName,
        course: courseName,
        semester: semester,
        professor: professorID
    };
    console.log(formData);
    request.post({url: 'https://openeval-server.herokuapp.com/surveys/default' + startTime + '/' + endTime + '/' + surveyName + '/' + courseName + '/' + semester + '/' + professorID, formData: formData});
    res.redirect('/active-surveys');
});

// views the results of a particular survey if user is a professor
// goes to question page of a particular survey if user is a student
app.post('/view-results', function(req, res) {
    // console.log(req.body.surveyID);
    var surveyID = req.body.surveyID.split(':')[0];
    if (user.usertype == "professor") {
        var viewSurvey = require('./public/js/view-survey.js');
        viewSurvey.getSurveyResults('https://openeval-server.herokuapp.com/responses/default/' + surveyID);
    } else if (user.usertype == "student") {
        var complete = require('./public/js/complete-survey.js');
        complete.getSurveyQuestions('https://openeval-server.herokuapp.com/questions/default', surveyID);
        res.redirect('/complete-survey');
    }
    res.redirect('/view-survey');
});

// results of an active survey
router.get('/view-survey', function(req, res) {
    // var viewSurvey = require('./public/js/view-survey.js');
    // viewSurvey.getSurveyResults('https://openeval-server.herokuapp.com/responses/default/' + '5bff571503a4fc00045bd9b3');
    res.sendFile(path + 'view-survey.html');
});

// posts the responses of a survey
app.post('/submit-survey', function(req, res) {
    console.log(req.body.pace);
    console.log(req.body.reachable);
    console.log(req.body.studentmore);
    console.log(req.body.studentless);
    console.log(req.body.studentsame);
    console.log(req.body.professormore);
    console.log(req.body.professorless);
    console.log(req.body.professorsame);
    console.log(req.body.comments);
    responses = [req.body.pace, req.body.reachable, req.body.studentmore, req.body.studentless, req.body.studentsame, req.body.professormore, req.body.professorless, req.body.professorsame, req.body.comments];
    var formData = {
        type: 'default',
        gatech_id: req.body.studentID,
        surveyID: req.body.surveyID,
        question: responses
    };
    console.log(formData);
    request.post({url: 'https://openeval-server.herokuapp.com/responses/responseComplete', formData: formData});
    res.redirect('/');
});

// goes to survey questions page
router.get('/complete-survey', function(req, res) {
    var complete = require('./public/js/complete-survey.js');
    complete.getSurveyQuestions('https://openeval-server.herokuapp.com/questions/default');
    res.sendFile(path + 'complete-survey.html');
});

// 404 page
app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// professor
// login -> registered courses
// registered courses -> current surveys of that course
// current surveys of that course -> view active survey
// current surveys of that course -> create new survey

// student
// login -> registered courses
// registered courses -> current surveys of that course
// current surveys of that course -> specific survey of that course (post responses)

// login (JWT)
// logout

// start local server
app.listen(3000, function() {
    console.log('Live on port 3000');
});