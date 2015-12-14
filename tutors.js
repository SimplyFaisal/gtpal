var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var app = require('./server');
var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Tutors = schemas.Tutor;

passport.use('tutor-registration', new LocalStrategy({

}, authentication.register(Tutors)));

passport.use('tutor-login', new LocalStrategy({

}, authentication.login(Tutors)));

router.post('/register', passport.authenticate('tutor-registration'));
router.post('/login', passport.authenticate('tutor-login'));

module.exports = router;