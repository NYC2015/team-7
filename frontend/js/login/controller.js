'use strict';

var loginCtrls = angular.module('plus.login', []);

loginCtrls.controller('loginCtrl', function($scope) {
    $scope.login = function() {
        if ($scope.username == "" || $scope.username === undefined) {
            return;
        }
        
        if ($scope.password == "" || $scope.password === undefined) {
            return;
        }
    }
});
