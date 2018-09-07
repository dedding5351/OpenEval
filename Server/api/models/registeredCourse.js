var mongoose = require('mongoose');

mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

db.once('open', function callback() {

    var regCoursesSchema = new mongoose.Schema({
        _id: mongoose.Schema.Types.ObjectId,
        courseNumber: String,
        courseName: String,
        professor: String
    });

    var RegisteredCourse = mongoose.model('regCourses', regCoursesSchema);
    RegisteredCourse.find((err, users) => {
        if (err) return console.err(err);
        console.log(users);
    })

});

const registeredCourses = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courseNumber: String,
    courseName: String,
    professor: String
});

module.exports = mongoose.model('registeredCourses', registeredCourses);