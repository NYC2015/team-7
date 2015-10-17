'use strict';

var loginCtrls = angular.module('plus.login', ['plus.api']);

loginCtrls.controller('loginCtrl', function($scope, api, $state, Session) {
    $scope.login = function() {
        if ($scope.username == "" || $scope.username === undefined) {
            return;
        }
        
        if ($scope.password == "" || $scope.password === undefined) {
            return;
        }

        api.login.login($scope.username, $scope.password).then(function(res) {
            Session.user.id = res.data['user_id']; 
            Session.user.name = res.data['user'];
            console.log(res, Session);
            $state.go('community');
        }, function(res) {
            $scope.error = res;
        });
    };
});
