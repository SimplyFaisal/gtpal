var express = require('express');
var mongoose = require('mongoose');

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Question = schemas.Question;

//router.use(authentication.isLoggedIn);

router.post('/', function(request, response) {
    var question = new Question();
    question.title = request.body.title;
    question.content = request.body.content;
    question.author = new mongoose.Types.ObjectId(request.body.author);
    question.course = new mongoose.Types.ObjectId(request.body.course);
    // TODO: enable anonymity.
    question.save(function(err) {
        if (err) {
            response.status(401);
            return response.send({message: 'An error occured.'});
        }
        return response.send(200);
    });
});

router.get('/', function(request, response) {
    var courses = request.param('courses').map(schemas.toObjectId);
    Question.find({})
        .where('course').in(courses)
        .populate('course').exec().then(
        function(questions) {
            return response.json(questions);
        }, function(error) {
            response.send(500);
        });
});

router.put('/upvote/:id', function(request, response) {
    Question.findByIdAndUpdate(schemas.toObjectId(request.params.id),
        { $inc: { upvotes: 1 }}).populate('course').exec().then(function(result) {
            response.json(result);
    }, function(error) {
        response.send(500);
    });
});

module.exports = router;