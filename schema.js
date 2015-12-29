var mongoose = require('mongoose');

var ROLES = {
    TUTOR: 1,
    STUDENT: 2
};

var TutorSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    saved: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    role: {type: String, default: ROLES.TUTOR}
});

var StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    courses: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    saved: [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}],
    role: {type: String, default: ROLES.STUDENT}
});

var QuestionSchema =  new mongoose.Schema({
    date: {type: Date, default: Date.now},
    title: String,
    content: String,
    upvotes: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'Student'},
    course: {type: mongoose.Schema.Types.ObjectId, ref: 'Course'},
    anonymous: {type: Boolean, default: false}
});

var VideoSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question'},
    upvotes: Number,
    url: String,
    tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'Tutor'}
});

var CourseSchema = new mongoose.Schema({
    major: String,
    number: String,
    numTutors: {type: Number, default: 0},
    numVideos: {type: Number, default: 0}
});

function validPassword(password) {
    return this.password == password;
}

function toObjectId(id) {
    return new mongoose.Types.ObjectId(id);
}

TutorSchema.methods.validPassword = validPassword;
StudentSchema.methods.validPassword = validPassword;

exports.Tutor = mongoose.model('Tutor', TutorSchema);
exports.Student = mongoose.model('Student', StudentSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
exports.Video = mongoose.model('Video', VideoSchema);
exports.Course = mongoose.model('Course', CourseSchema);
exports.toObjectId = toObjectId;