const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('../models/JWT');
const Student = require('../models/students.js');
const Professor = require('../models/professors.js');

var issuer = "OpenEval";
var audience = "OpenEval";


router.post('/login',(req, res, next) => {


    console.log(req.body.username);
    console.log(req.body.password);

    Student.find({"gatech_id": req.body.username, "gatech_pw" : req.body.password}).exec(function(err, result) {

        if (err) throw err;

        var found = false;

        if (result.length == 0) {
            Professor.find({"gatech_id": req.body.username, "gatech_pw" : req.body.password}).exec(function(err, result){
                    
                if (err) throw err;

                found = result.length > 0
            });
        } else {
            found = true
        }


        if (found) {
            var response = {authenticated : true};

            var token = jwt.sign(response, {
                issuer : issuer,
                subject : req.body.username,
                audience : audience
            });


            res.status(200).json({token : token});
        } else {
            var response = {message : "username/password combination not found"};
            res.status(401).json(response)
        }

    });
});


router.get('/authenticate', (req, res, next) => {
    var token = req.headers.authorization;
    var clientId = req.headers.clientId;
    console.log(token);
    var verified = jwt.verify(token, {
        issuer : issuer,
        subject : clientId,
        audience : audience
    });
    console.log(verified);
    if (verified != false) {
        res.status(200).json({authenticated : true});
    } else {
        res.status(403).json({authenticated : false});
    }

});


module.exports = router;

