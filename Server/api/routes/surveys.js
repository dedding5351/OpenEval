const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Survey = require('../models/survey');
const Default = require('../models/questions');



router.get('/:professor',(req, res, next) => {
    const professor = req.params.professor
    Survey.find({'professor' : professor}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

router.get('/:professor/:course',(req, res, next) => {
    const professor = req.params.professor
    const course = req.params.course
    Survey.find({'professor' : professor, 'course' : course}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

router.post('/default/:startTime/:endTime/:surveyName/:course/:semester/:professor', (req, res, next) => {
    const arr = Default.find({'type': 'default'}).exec(function(err,result) {
        if (err) throw err;
        const q = result[0].questions;
        var questions = [];
        for (var i = 0; i < q.length; i++) {
            questions.push(q[i].question);
        }
        const survey = new Survey({
            _id: new mongoose.Types.ObjectId(),
            questions: questions,
            startTime: req.params.startTime,
            endTime: req.params.endTime,
            name: req.params.surveyName,
            course: req.params.course,
            semester: req.params.semester,
            professor: req.params.professor
        });
        survey.save().then(result => {
            console.log(result);
        })
        .catch(err => console.log(err));
        res.status(200).json({
            message: 'Handling POST requests to /surveys',
            createdCourse: survey
        });
    });
});



router.post('/:questions/:startTime/:endTime/:surveyName/:course/:semester/:professor',(req, res, next) => {
    const survey = new Survey({
        _id: new mongoose.Types.ObjectId(),
        questions: req.params.questions,
        startTime: req.params.startTime,
        endTime: req.params.endTime,
        name: req.params.surveyName,
        course: req.params.course,
        semester: req.params.semester,
        professor: req.params.professor
    });
    survey.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /surveys',
        createdCourse: survey
    });
});

// router.get('/:courseNumber',(req, res, next) => {
//     const id = req.params.courseNumber;
//     Course.find({'courseNumber': {'$regex': id, '$options': 'i'}}).exec(function(err, result){
//         if (err) throw err;
//         res.status(200).json({
//             message: result
//         });
//     });

// });

module.exports = router;