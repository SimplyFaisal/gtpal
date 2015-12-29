var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Students = schemas.Student;
var strategyOptions = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
};
passport.use('student-registration', new LocalStrategy(strategyOptions, authentication.register(Students)));
passport.use('student-login', new LocalStrategy(strategyOptions, authentication.login(Students)));

var options = {
    failureFlash: true
};

router.post('/register', authentication.handler(passport, 'student-registration'));
router.post('/login', authentication.handler(passport, 'student-login'));
router.put('/save/:id', function(request, response) {
    Students.findByIdAndUpdate(schemas.toObjectId(request.user.id),
        {$addToSet: {saved: schemas.toObjectId(request.params.id)}})
        .exec().then(function(data) {
            response.send(200);
        }, function(error) {
            response.send(500);
        });
});
module.exports = router;