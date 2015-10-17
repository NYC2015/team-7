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
            Session.user.id = res.data.profile.id;
            Session.user.name = res.data.profile.name;
            Session.user.user = res.data.profile.username;
            console.log(res.data);
            $state.go('community');
        }, function(res) {
            $scope.error = res;
        });
    };
});

