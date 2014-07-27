(function() {
    'use strict';

    angular.module('app', ['ngRoute'])
        .config(function($routeProvider) {
            $routeProvider
                .when('/', {
                    controller: 'HomeController',
                    controllerAs: 'home',
                    templateUrl: 'views/home.html'
                })
                .when('/creator', {
                    templateUrl: 'views/creator.html'
                });
        });
}());
