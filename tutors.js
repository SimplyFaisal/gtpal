var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Tutors = schemas.Tutor;
var strategyOptions = {
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true,
};
passport.use('tutor-registration', new LocalStrategy(strategyOptions, authentication.register(Tutors)));
passport.use('tutor-login', new LocalStrategy(strategyOptions, authentication.login(Tutors)));

var options = {
    failureFlash: true
};

router.post('/register', authentication.handler(passport, 'tutor-registration'));
router.post('/login', authentication.handler(passport, 'tutor-login'));
module.exports = router;