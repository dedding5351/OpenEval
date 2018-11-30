var mongo = require('mongodb');
var mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:password978@openeval-mvp-sample-cluster-ohzcj.mongodb.net/database?retryWrites=true',
{
    useNewUrlParser: true
}
);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));

const user = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    courses: String,
    gatech_id : String,
    full_name : String,
    gatech_pw : String}
);



module.exports = mongoose.model('professors', user);