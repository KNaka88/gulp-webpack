(function () {
    "use strict";
    var app = angular.module("app", ["ui.router", "page1", "ngAnimate"]);
    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
            $locationProvider.hashPrefix('');
            $stateProvider
                .state('/page1', {
                templateUrl: "page1/page1.html",
                controller: "PageController",
                url: "/page1"
            });
            $urlRouterProvider.otherwise('/');
        }]);
}());
