const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const StudentRegCourse = require('../models/studentRegCourse');


//get all the classes a student is registered for
router.get('/:username',(req, res, next) => {
    const user = req.params.username;
    StudentRegCourse.find({'student': user}).exec(function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).json({
            message: result
        });
    });

});

//register a student for a course
router.post('/register',(req, res, next) => {
    console.log(req.body.courseNumber);
    console.log(req.body.courseName);
    console.log(req.body.professor);

    StudentRegCourse.updateMany({'student': req.body.student, 'professor': req.body.professor, 'courseNumber': req.body.courseNumber}, {'courseName': req.body.courseName}, {upsert: true}).exec(function(err, result){
            if (err) throw err;
            res.status(200).json({
                message: result
            });
    });

});






module.exports = router;