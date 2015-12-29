var express = require('express');
var mongoose = require('mongoose');

var schemas = require('./schema');
var authentication = require('./authentication');

var router = express.Router();
var Video = schemas.Video;

// router.use(authentication.isLoggedIn); Disabled for testing
router.post('/', function(request, response) {

});