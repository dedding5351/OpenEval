const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('../models/JWT');
const Student = require('../models/students.js');
const Professor = require('../models/professors.js');

var issuer = "OpenEval";
var audience = "OpenEval";


async function student_match(gatech_id, gatech_pw) {
    return new Promise(function(resolve, reject) {
        Student.find({"gatech_id": gatech_id, "gatech_pw" : gatech_pw}).exec(function(err, result) {
        
            if (err) reject(err);
            console.log("checking student");
            console.log(result);

            var ret_object = {authenticated : false, user_type : ""}
            if (result.length > 0) {
                ret_object.authenticated = true;
                ret_object.user_type = "student";
            }
            resolve(ret_object)
        })
    })
    

}

async function professor_match(gatech_id, gatech_pw) {
    return new Promise(function(resolve, reject) {
        Professor.find({"gatech_id": gatech_id, "gatech_pw" : gatech_pw}).exec(function(err, result) {
        
            if (err) reject(err);
            console.log("checking professor");
            console.log(result);

            var ret_object = {authenticated : false, user_type : ""}
            if (result.length > 0) {
                ret_object.authenticated = true;
                ret_object.user_type = "professor";
            }
            resolve(ret_object)
        })
    })
}


async function login(username, password) {

    let s_match = await student_match(username, password);
    let p_match = await professor_match(username, password);



    return Promise.all([student_match(username, password), professor_match(username, password)])
        .then(([student_authentication, professor_authentication]) => {
            if (!student_authentication.authenticated) {
                return professor_authentication
            } else {
                return student_authentication
            }
        })
}


router.post('/login',(req, res, next) => {





    login(req.body.username, req.body.password).then(function(login_results) {
        console.log(login_results);    

        if (login_results != undefined && login_results.authenticated) {

            var user_type =  login_results.user_type;

            var response = {authenticated : true};

            var token = jwt.sign(response, {
                issuer : issuer,
                subject : req.body.username,
                audience : audience
            });

            res.status(200).json({token : token, user_type : user_type});

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

