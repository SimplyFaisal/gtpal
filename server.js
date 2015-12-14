var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');

var app = express();
var tutorRoutes = require('./tutors');
var schemas = require('./schema');
var authentication = require('./authentication');
var tutorModel = schemas.Tutor;
var studentModel = schemas.Student;

passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser(studentModel,
    tutorModel));

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/tutors', tutorRoutes);

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;