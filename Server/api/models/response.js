var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

//db.once('open', function callback() {
//    var userSchema = new mongoose.Schema({
//        _id: mongoose.Schema.Types.ObjectId,
//        courseNumber: String,
//        courseName: String
//    });
//    var User = mongoose.model('User', userSchema, 'courses');
//    User.find(function(err, users){
//        if(err) return console.err(err);
//    });
//
//});

const response = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    surveyID: String,
    question: String,
    response: String,
    gatech_id: String,
    type: String
	});


module.exports = mongoose.model('Responses', response);