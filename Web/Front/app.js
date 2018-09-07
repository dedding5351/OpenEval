var express = require('express');
var app = express();
var router = express.Router();

var path = __dirname + '/views/';

app.use('/', router);

router.get('/', function(req, res) {
    res.sendFile(path + 'index.html');
});

router.get('/all-classes', function(req, res) {
    res.sendFile(path + 'all-classes.html');
});

router.get('/about', function(req, res) {
    res.sendFile(path + 'about.html');
});

app.use('*', function(req, res) {
    res.send('404 Not Found');
});

// app.get('/', function(req, res) {
//     res.send('<h1>testing</h1>');
// });



app.listen(3000, function() {
    console.log('Live on port 3000');
});