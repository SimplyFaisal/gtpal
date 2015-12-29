(function(angular) {

var gtpal = angular.module('gtpal');

gtpal.controller('StudentDoryController', StudentDoryController);
gtpal.directive('submitQuestionCard', SubmitQuestionCard);
gtpal.directive('studentQuestionCard', StudentQuestionCard);


function StudentDoryController($state, Question, Session) {
    var User = Session.getCurrentUser();
    var courses = User ? User.courses :  ["5671f12f1dd1f8d6104f61f7", "5671f12f1dd1f8d6104f61fd", "5671f12f1dd1f8d6104f6250"];
    this.questions = Question.query({courses: courses});

    this.saveQuestion = function(question) {
        return User.$saveQuestion({id: question._id});
    };

}

function StudentSavedController($state, Question, Session) {
    var User = Session.getCurrentUser();

}

function StudentQuestionCard() {
    var directive = {
        scope: {
            question: '=',
            saveQuestion: '&'
        },
        templateUrl: '/src/student/student-question-card-template.html'
    };

    directive.controller = function($scope) {

        $scope.save = function() {
            $scope.saveQuestion({question: $scope.question}).then(function(resposne) {
                $scope.success = true;
                setTimeout(function() {
                    $scope.success = false;
                    $scope.$apply();
                }, 1500);
            }, function(error) {

            });
        };

        $scope.upvote = function() {
            $scope.question.$upvote({id: $scope.question._id}).then(function(response) {
                $scope.question.upvotes++;
            }, function(error) {

            });
        };
    };

    return directive;
}

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
        $scope.submitted = false;
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
                $scope.submitted = true;
                setTimeout(function() {
                    $scope.submitted = false;
                    $scope.toggle();
                    $scope.$apply();
                }, 2000);
            });
        };
    };

    directive.link = function($scope, $element, $attrs) {

    };

    return directive;
}


})(angular);