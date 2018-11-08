const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const RegisteredCourse = require('../models/registeredCourse');



router.get('/:professor',(req, res, next) => {
    const prof = req.params.professor;
    console.log(prof);
    RegisteredCourse.find({'professor': prof}).exec(function(err, result){
        if (err) throw err;
        console.log(result);
        res.status(200).json({
            message: result
        });
    });

});

router.post('/register',(req, res, next) => {
    console.log(req.body.courseNumber);
    console.log(req.body.courseName);
    console.log(req.body.professor);

    RegisteredCourse.updateMany({'professor': req.body.professor, 'courseNumber': req.body.courseNumber}, {'courseName': req.body.courseName}, {upsert: true}).exec(function(err, result){
            if (err) throw err;
            res.status(200).json({
                message: result
            });
    });

});






module.exports = router;