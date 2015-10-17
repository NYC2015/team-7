'use strict';

var loginCtrls = angular.module('plus.login', ['plus.api']);

loginCtrls.controller('loginCtrl', function($scope, api) {
    $scope.login = function() {
        if ($scope.username == "" || $scope.username === undefined) {
            return;
        }
        
        if ($scope.password == "" || $scope.password === undefined) {
            return;
        }

        api.login.login($scope.username, $scope.password).then(function() {
            // go to community if login was succesful
        })
    }
});
