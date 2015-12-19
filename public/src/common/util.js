(function(angular) {

var gtpal = angular.module('gtpal');

gtpal.controller('LoginController', LoginController);

function LoginController($state, Student, Tutor) {
    this.error = null;

    this.submit = function() {
        var user = $state.current.name == 'signin.student' ? Student: Tutor;

        user.login({email: this.email, password: this.password}).$promise
            .then(function(user) {
                console.log(user);
            }.bind(this), function(error) {
                this.error = error.data;
            }.bind(this));
    };

}

})(angular);