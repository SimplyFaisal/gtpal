(function(angular) {

var gtpal = angular.module('gtpal');

gtpal.directive('submitQuestionCard', SubmitQuestionCard);

function SubmitQuestionCard() {
    var directive = {
        scope: {},
        templateUrl: '/src/student/submit-question-template.html'
    };

    directive.controller = function($scope, Course, Question, Session) {
        $scope.vm = {};
        $scope.vm.selectedMajor = 'Majors';
        $scope.vm.selectedCourse = 'Courses';
        $scope.visible = false;
        $scope.courses = null;
        $scope.selectedCourse = null;
        $scope.majors = Course.query();

        var User = Session.getCurrentUser();

        $scope.toggle = function() {
            $scope.visible = !$scope.visible;
        };

        $scope.selectMajor = function(major) {
            $scope.vm.selectedMajor = major;
            $scope.courses =  Course.query({major: major});
        };

        $scope.selectCourse = function(course) {
            $scope.vm.selectedCourse = course.number;
            $scope.selectedCourse = course;
        };

        $scope.submit = function() {
            var question = new Question();
            question.author = User._id;
            question.title = $scope.title;
            question.content = $scope.content;
            question.course = $scope.selectedCourse._id;
            // TODO: enable anonymity.

            question.$save(function(data) {
                console.log('success');
            });
        };
    };

    directive.link = function($scope, $element, $attrs) {

    };

    return directive;
}


})(angular);