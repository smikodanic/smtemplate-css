/*global angular*/
var clientApp = angular.module('clientApp', []);


////// CONTROLLERS
clientApp.controller('mainCtrl', function ($scope, $window) {
    'use strict';
    $scope.myVar = 'Something goood!';
});
