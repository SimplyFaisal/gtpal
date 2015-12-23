var express = require('express');
var helmet = require('helmet');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var flash = require('connect-flash');
var passport = require('passport');
var mongoose = require('mongoose');
var session = require('express-session');

var app = express();
var config = require('./config')('dev');
var schemas = require('./schema');
var authentication = require('./authentication');

mongoose.connect(config.database.uri);
passport.serializeUser(authentication.serializeUser);
passport.deserializeUser(authentication.deserializeUser(schemas.Student,
    schemas.Tutor));

app.use('/', express.static(__dirname + '/public'));
app.use(helmet());
app.use(session({secret: config.sessionSecret}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/tutor', require('./tutors'));
app.use('/student', require('./students'));
app.use('/course', require('./courses'));
app.use('/question', require('./questions'));

var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

module.exports = app;