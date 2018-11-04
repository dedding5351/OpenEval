const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const jwt = require('../models/JWT');

var issuer = "OpenEval";
var audience = "OpenEval";


router.post('/login',(req, res, next) => {

    var response = {authenticated : true};
    
    var token = jwt.sign(response, {
        issuer : issuer,
        subject : req.body.username,
        audience : audience
    });



    res.status(200).json({token : token});

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

