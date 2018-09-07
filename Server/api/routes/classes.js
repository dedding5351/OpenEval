const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const courses = require('../models/course');
const registeredCourses = require('../models/registeredCourse')

router.get('/',(req, res, next) => {
    courses.find().exec(function(err, result){
        if (err) throw err;
        console.log(result);
    });
    res.status(200).json({
        message: 'Handling GET requests to /classes'
    });
});

router.post('/',(req, res, next) => {
    const course = new Course({
        _id: new mongoose.Types.ObjectId(),
        courseNumber: req.body.courseNumber,
        courseName: req.body.courseName
    });
    course.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /classes',
        createdCourse: course
    });
});

router.get('/:courseNumber',(req, res, next) => {
    const id = req.params.courseNumber;
    console.log(id);
    Course.find()
        .where('courseNumber')
        .equals(id)
        .select('courseName')
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(200).json(doc);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error:err});
        });
});

router.post('/register', (req, res) => {

    const registeredCourse = new RegisteredCourse({
        _id: new mongoose.Types.ObjectId(),
        professor : req.body.professor,
        courseName : req.body.courseName,
        courseNumber: req.body.courseNumber
    });

    registeredCourse.save().then(res => {
        console.log(res);
        res.status(200).json({success : true});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
});

module.exports = router;