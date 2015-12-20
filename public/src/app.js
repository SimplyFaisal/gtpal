(function(angular) {

'use strict'
var gtpal = angular.module('gtpal', ['ui.router', 'ngResource']);

gtpal.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url:'/home',
            templateUrl: 'src/home/home-template.html'
        })

        .state('signin', {
            url:'/signin',
            templateUrl: 'src/signin/signin-template.html',
            controller: 'LoginController',
            controllerAs: 'loginControl'
        })
        .state('signin.tutor', {
            url: '/tutor',
            templateUrl: 'src/signin/role-template.html'

        })
        .state('signin.student', {
            url: '/student',
            templateUrl: 'src/signin/role-template.html'

        })
        .state('signup', {
            url: '/signup',
            templateUrl: 'src/signup/signup-template.html',
            controller: 'RegisterController',
            controllerAs: 'registerControl'
        })
        .state('signup.tutor', {
            url: '/tutor',
            templateUrl: 'src/signup/signup-form.html',
        })
        .state('signup.student', {
            url: '/student',
            templateUrl: 'src/signup/signup-form.html',
        })
});

})(angular);