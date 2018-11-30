var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

<<<<<<< HEAD
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
=======
db.once('open', function callback() {
    var userSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        courseNumber: String,
        courseName: String
    });
    var User = mongoose.model('User', userSchema, 'courses');
    User.find(function(err, users){
        if(err) return console.err(err);
        // console.log(users);
    });

    var regCoursesSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        courseNumber: String,
        courseName: String,
        professor: String
    });
>>>>>>> origin/Add-Registered-Course

const course = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseNumber: String,
    courseName: String}
);


module.exports = mongoose.model('Course', course);