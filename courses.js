var express = require('express');

var schemas = require('./schema');

var router = express.Router();
var Courses = schemas.Course;

router.get('/majors', function(request, response) {
    Courses.distinct('major').exec().then(function(results) {
        response.json(results);
    }, function(error) {

    });
});

router.get('/:major', function(request, response) {
    Courses.find({}).where('major').equals(request.params.major).exec().then(
        function(courses) {
            response.json(courses);
        }, function(error) {

        });
});

module.exports = router;