(function(angular) {

var gtpal = angular.module('gtpal');

gtpal.controller('LoginController', LoginController);
gtpal.controller('RegisterController', RegisterController);
gtpal.directive('courseSelectionCard', CourseSelectionCard);

function LoginController($state, Student, Tutor, Session) {
    this.error = null;

    this.submit = function() {
        var isStudent = $state.current.name == 'signin.student';
        var user = isStudent ? Student : Tutor;
        var nextState = isStudent ? 'student.dory' : 'tutor.dory';

        user.login({email: this.email, password: this.password}).$promise
            .then(function(user) {
                Session.setCurrentUser(user);
                $state.go(nextState);
            }.bind(this), function(error) {
                this.error = error.data;
            }.bind(this));
    };
}

function RegisterController($state, Student, Tutor, Course, Session) {
    this.error = null;
    this.majors = Course.query();

    // Passed into CourseSelectionCard to keep track of which courses are
    // selected.
    this.selected = {};

    this.submit = function() {
        var user = this.isStudent ? Student : Tutor;
        var nextState = isStudent ? 'student.dory' : 'tutor.dory';
        var credentials = {
            fullName: this.fullName,
            email: this.email,
            password: this.password,
            courses: Object.keys(this.selected)
        };
        user.register(credentials).$promise.then(function(user) {
            Session.setCurrentUser(user);
            $state.go(nextState);
        }.bind(this), function(error) {
            this.error = error.data;
        }.bind(this));
    };

    this.courseText = function() {
        var studentText = 'Please select courses that you are interested in getting help with.';
        var tutorText = 'Please select courses that you are comfortable tutoring.';
        return this.isStudent() ? studentText : tutorText;
    };

    this.isStudent = function() {
        return $state.current.name == 'signup.student';
    };
}

function CourseSelectionCard() {
    var directive = {
        scope: {
            major: '=',
            selected : '='
        },
        templateUrl:'/src/signup/course-selection-card.html'
    };

    directive.controller = function($scope, Course) {
        $scope.courses = Course.query({major: $scope.major});

        $scope.addCourse = function (id) {
            if ($scope.selected[id]) {
                delete $scope.selected[id];
                return;
            }
            $scope.selected[id] = true;
        };

        $scope.getColor = function(id) {
            return $scope.selected[id] ? 'btn-primary' : 'btn-default';
        };
    };

    directive.link = function($scope, $element, $attrs) {

    };

    return directive;
}

})(angular);