(function() {

'use strict'
var gtpal = angular.module('gtpal', ['ui.router']);

gtpal.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');
    $stateProvider
        .state('home', {
            url:'/home',
            views: {
                '': {
                    templateUrl: 'src/home/home-template.html'
                }
            }
        })

});
})();