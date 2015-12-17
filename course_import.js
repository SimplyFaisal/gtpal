var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');

var schema = require('./schema');
var config = require('./config')('dev');

mongoose.connect(config.database.uri);
var COURSE_WEBSITE = 'http://www.success.gatech.edu/tutoring/1-to-1/courses-supported';

request(COURSE_WEBSITE, function(error, response, html) {
    if (error) {
        return;
    }
    var $ = cheerio.load(html);
    $('tr').each(function(index, element) {
        var majorElement = $(element).children().first();
        var courses = majorElement.next().text().trim().split(',');
        courses.forEach(function(course) {
            var newCourse = new schema.Course();
            newCourse.major = majorElement.text().trim();
            newCourse.number = course.trim();
            newCourse.save(function(error) {
                if (error) {
                    console.log(error);
                }
            });
        })
        console.log('DONE');
    });
});