const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Response = require('../models/response');


router.get('/:surveyID',(req, res, next) => {
    const surveyID = req.params.surveyID;
    Response.find({'surveyID': surveyID}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});

router.post('/responseComplete',(req, res, next) => {
    Response.updateMany({'username': req.body.username, 'surveyID': req.body.surveyID, 'questionID': req.body.questionID}, {'response': req.body.response}, {upsert: true}).exec(function(err, result){
        if (err) throw err;
        res.status(200).json({
            message: result
        });
    });

});




module.exports = router;