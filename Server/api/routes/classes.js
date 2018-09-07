const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const courses = require('../models/course');
router.get('/',(req, res, next) => {
    courses.find().exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
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
    courses.find({'courseNumber': {'$regex': id, '$options': 'i'}}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

module.exports = router;