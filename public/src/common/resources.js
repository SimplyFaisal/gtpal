(function(angular){

var gtpal = angular.module('gtpal');

gtpal.factory('Course', Course);
gtpal.factory('Student', Student);
gtpal.factory('Tutor', Tutor);
gtpal.factory('Question', Question);

function Course($resource) {
    return $resource('/course/:major', {major: '@major'});
}

function Question($resource) {
    return $resource('/question/:major/:number', {major: '@major',
        number: '@number'}, {
            upvote: {
                method: 'PUT',
                url: 'question/upvote/:id'
            }
        });
}

function Student($resource) {
    return $resource('/student/:id', {id: '@id'}, {
        login:  {
            method: 'POST',
            url: 'student/login',

        },
        register:  {
            method: 'POST',
            url: 'student/register'
        },
        saveQuestion: {
            method: 'PUT',
            url: 'student/save/:id'
        }
    });
}

function Tutor($resource) {
    return $resource('/tutor/:id', {id: '@id'}, {
        login:  {
            method: 'POST',
            url: 'tutor/login',

        },
        register:  {
            method: 'POST',
            url: 'tutor/register'
        }
    });
}

})(angular);
