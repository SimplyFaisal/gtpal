(function(angular){

var gtpal = angular.module('gtpal');

gtpal.service('AuthenticationService', AuthenticationService);

AuthenticationService.$inject = ['$http'];
function AuthenticationService($http) {

    this.login = function(email, password) {
        return $http({
            method: 'POST',
            url: 'student/login',

        })
    };

    this.register = function(email, password, courses) {

    };
}
})(angular)