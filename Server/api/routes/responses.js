const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Response = require('../models/response');


router.get('/:surveyID',(req, res, next) => {
    const surveyID = req.params.surveyID
    Response.find({'surveyID': surveyID}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

router.post('/responseComplete',(req, res, next) => {
    const response = new Response({
        _id: new mongoose.Types.ObjectId(),
        surveyID: req.body.surveyID,
        questionID: req.body.questionID,
        response: req.body.response
    });
    response.save().then(result => {
        console.log(result);
    })
    .catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /response',
        createdCourse: response
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