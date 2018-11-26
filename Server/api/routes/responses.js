const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectID;
const Response = require('../models/response');
const Question = require('../models/questions');

//get responses of a specific survey
router.get('/default/:surveyID',(req, res, next) => {
    var answers = {};
    Response.find({'surveyID': req.params.surveyID}).exec(function(err, result){
        if (err) throw err;
        for (var i = 0; i < result.length; i++) {
            //if not q not def and free
            if (answers[result[i].question] == undefined && result[i].type == "free") {
                answers[result[i].question] = [result[i].response];
            }
            //if q defined and free add to arr
            else if (answers[result[i].question] != undefined && result[i].type == "free") {
                var prev = answers[result[i].question];
                answers[result[i].question] = prev.concat((result[i].response));
            }
            else if (answers[result[i].question] == undefined && result[i].type == "mc") {
                options = {};
                options[result[i].response] = 1;
//                console.log(options);
                answers[result[i].question] = options;
//                console.log(answers);

            }
            else if (answers[result[i].question] != undefined && result[i].type == "mc") {
                console.log(answers[result[i].question]);
                var responses = answers[result[i].question]
                if (responses[result[i].response] == undefined) {
                    responses[result[i].response] = 1;
                } else {
                    var count = responses[result[i].response] + 1;
                    responses[result[i].response] = count;
                }
                console.log(answers);
//                if answers[result[i].question]
//                var count = answers[result[i].question];
//                answers[result[i].question] = count + 1;
            }
        }
//        console.log(answers);
//        console.log(result);
        res.status(200).json({
            message: answers
        });
    });

});



//submits a survey response and updates response if survey was previously
router.post('/responseComplete',(req, res, next) => {
    Response.updateMany({'type': req.body.type,'gatech_id': req.body.gatech_id, 'surveyID': req.body.surveyID, 'question': req.body.question}, {'response': req.body.response}, {upsert: true}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});




module.exports = router;