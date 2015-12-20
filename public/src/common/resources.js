(function(angular){

var gtpal = angular.module('gtpal');

gtpal.factory('Course', Course);
gtpal.factory('Student', Student);
gtpal.factory('Tutor', Tutor);

function Course($resource) {
    return $resource('/course/:major', {major: '@major'});
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
