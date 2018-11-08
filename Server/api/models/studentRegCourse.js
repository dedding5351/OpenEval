var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));


const studentRegCourse = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseNumber: String,
    courseName: String,
    professor: String,
    student: String});


module.exports = mongoose.model('StudentRegCourse', studentRegCourse);