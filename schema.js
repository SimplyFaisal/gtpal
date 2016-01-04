var mongoose = require('mongoose');
var uuid = require('node-uuid');
var authentication = require('./authentication');

var ROLES = {
    TUTOR: 1,
    STUDENT: 2
};

function BaseUserFields() {
    this.name = {type: String, required: true};
    this.email = {type: String, required: true};
    this.password = {type: String, required: true};
    this.salt =  { type: String, required: true, default: uuid.v1 };
    this.courses = [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}];
    this.saved = [{type: mongoose.Schema.Types.ObjectId, ref: 'Course'}];
}

function TutorFields () {
    BaseUserFields.call(this);
    this.role = {type: Number, default: ROLES.TUTOR};
}

function StudentFields() {
    BaseUserFields.call(this);
    this.role = {type: Number, default: ROLES.STUDENT};
}

var TutorSchema = new mongoose.Schema(new TutorFields());

var StudentSchema = new mongoose.Schema(new StudentFields());

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

function setPassword(password) {
    this.password = authentication.hash(password, this.salt);
}

function validPassword(password) {
    return this.password == authentication.hash(password, this.salt);
}

function toObjectId(id) {
    return new mongoose.Types.ObjectId(id);
}

TutorSchema.methods.validPassword = validPassword;
StudentSchema.methods.validPassword = validPassword;

TutorSchema.methods.setPassword = setPassword;
StudentSchema.methods.setPassword = setPassword;

exports.Tutor = mongoose.model('Tutor', TutorSchema);
exports.Student = mongoose.model('Student', StudentSchema);
exports.Question = mongoose.model('Question', QuestionSchema);
exports.Video = mongoose.model('Video', VideoSchema);
exports.Course = mongoose.model('Course', CourseSchema);
exports.toObjectId = toObjectId;