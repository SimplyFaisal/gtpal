var express = require('express');
var mongoose = require('mongoose');

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Question = schemas.Question;

router.post('/', authentication.isLoggedIn, function(request, response) {
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

module.exports = router;