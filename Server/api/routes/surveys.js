const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Survey = require('../models/survey');
const Default = require('../models/questions');
const ObjectId = require('mongodb').ObjectID;



router.get('/:professor',(req, res, next) => {
    const professor = req.params.professor;
    Survey.find({'professor' : professor}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

//get specific survey details

router.get('/',(req, res, next) => {
    const surveyID = req.body.surveyID;
    Survey.find({"_id": new ObjectId(surveyID)}).exec(function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).json({
            message: result
        });
    });
});


//view available surveys in a course (professor or student)

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
            var x = {
                       question: q[i].question,
                       questionID: q[i].id,
                       type: q[i].type
                       };
            if (q[i].type == "mc") {
                x.option = q[i].options;
            }
            questions.push(x);
        }
        console.log(questions);

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