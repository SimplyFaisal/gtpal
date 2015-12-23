(function(angular){

var gtpal = angular.module('gtpal');

gtpal.service('AuthenticationService', AuthenticationService);
gtpal.service('Session', Session);

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

function Session() {
    var currentUser = null;

    this.setCurrentUser = function(user) {
        currentUser = user;
    };

    this.getCurrentUser = function() {
        return currentUser;
    };
}


})(angular)