var mongoose = require('mongoose');

var TutorSchema = new mongoose.Schema({
    name: String,
    email: String,
    courses: [String]
});

var StudentSchema = new mongoose.Schema({
    name: String,
    email: String,
    courses: [String]
});

var QuestionSchema =  new mongoose.Schema({
    date: {type: Date, default: Date.now},
    content: String,
    student: {type: mongoose.Schema.Types.ObjectId, ref: 'students'},
    course: [String]
});

var VideoSchema = new mongoose.Schema({
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'questions'},
    upvotes: Number,
    url: String,
    tutor: {type: mongoose.Schema.Types.ObjectId, ref: 'tutors'}
});

var CourseSchema = new mongoose.Schema({
    name: String,
    numTutors: Number,
    numVideos: Number
});

exports.Tutor = mongoose.model('Tutor', TutorSchema);
exports.Student = mongoose.model('Student', StudentSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
exports.Video = mongoose.model('Video', VideoSchema);
exports.Course = mongoose.model('Course', CourseSchema);