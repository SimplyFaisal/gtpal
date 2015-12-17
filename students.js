var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Students = schemas.Students;
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
module.exports = router;